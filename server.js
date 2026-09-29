/**
 * Custom server for VPS deployment.
 *
 * Why this exists rather than plain `next start`:
 *   - Graceful shutdown on SIGTERM, so systemd/pm2 restarts drain in-flight
 *     requests instead of dropping them mid-response.
 *   - A /healthz endpoint for uptime monitoring and load balancer checks.
 *   - Bound to 127.0.0.1 by default so only nginx can reach it.
 *
 * It adds no performance: `next start` serves the same prerendered output.
 * See "Deploying" in README.md for the nginx + systemd setup.
 *
 * NOTE: this file bypasses the Next.js compiler entirely. It is plain
 * CommonJS, runs on the system `node` binary, and needs no build step.
 */

"use strict";

const http = require("node:http");
const next = require("next");

const DEV = process.env.NODE_ENV !== "production";
const PORT = Number.parseInt(process.env.PORT || "3000", 10);
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";
const SHUTDOWN_GRACE_MS = Number.parseInt(
  process.env.SHUTDOWN_TIMEOUT_MS || "10000",
  10,
);

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  throw new Error(`Invalid PORT: ${process.env.PORT}`);
}
if (!Number.isInteger(SHUTDOWN_GRACE_MS) || SHUTDOWN_GRACE_MS < 0) {
  throw new Error(
    `Invalid SHUTDOWN_TIMEOUT_MS: ${process.env.SHUTDOWN_TIMEOUT_MS}`,
  );
}

const app = next({ dev: DEV, hostname: HOSTNAME, port: PORT });
const handle = app.getRequestHandler();

const server = http.createServer((req, res) => {
  if (req.url === "/healthz") {
    res.writeHead(200, {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  // Next.js starts writing the response inside handle(), so any header we
  // want to own must be set before this call. Anything set after resolves
  // is silently discarded.
  handle(req, res);
});

// nginx's default proxy_read_timeout is 60s. Staying just under it means
// nginx closes an idle upstream socket before Node does, so a rolling
// restart never stalls on a lingering keep-alive connection.
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;

let shuttingDown = false;

function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;

  // systemd sends SIGTERM; pm2 and Ctrl+C send SIGINT. Both need to drain.
  console.log(`[server] ${signal} received, closing gracefully`);
  server.close(() => {
    console.log("[server] closed cleanly");
    process.exit(0);
  });

  // Backstop: if a keep-alive socket refuses to drain, exit anyway rather
  // than sitting until systemd escalates to SIGKILL.
  setTimeout(() => {
    console.error("[server] graceful shutdown timed out, forcing exit");
    process.exit(1);
  }, SHUTDOWN_GRACE_MS).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

process.on("unhandledRejection", (reason) => {
  console.error("[server] unhandled rejection:", reason);
  shutdown("unhandledRejection");
});

app.prepare().then(() => {
  server.listen(PORT, HOSTNAME, () => {
    const mode = DEV ? "development" : "production";
    console.log(`[server] ready on http://${HOSTNAME}:${PORT} (${mode})`);
    console.log(`[server] health check: http://${HOSTNAME}:${PORT}/healthz`);
  });
});

server.on("error", (err) => {
  console.error("[server] http server error:", err);
  process.exit(1);
});
