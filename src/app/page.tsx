import Image from "next/image";

const PPDB_URL = "https://smktelkom-sda.sch.id/ppdb";
const SITE_URL = "https://smktelkom-sda.sch.id";

const NAV_LINKS = [
  { href: "#jurusan", label: "Jurusan" },
  { href: "#tentang", label: "Tentang" },
  { href: "#kontak", label: "Kontak" },
];

const PROGRAM = {
  acronym: "TKJ",
  title: "Teknik Komputer dan Jaringan",
  body: "Merakit dan memperbaiki komputer, lalu membangun jaringan kabel, nirkabel, dan internet of things.",
  image: true,
} as const;

const MORE_PROGRAMS = [
  {
    acronym: "RPL",
    title: "Rekayasa Perangkat Lunak",
    body: "Membangun aplikasi web dan mobile dengan pemrograman standar industri, dari basis data sampai antarmuka.",
    tone: "surface",
  },
  {
    acronym: "TAV",
    title: "Teknik Audio Video",
    body: "Mengoperasikan alat produksi audio dan video, mulai dari perekaman sampai penyiaran.",
    tone: "brand",
  },
] as const;

const FACTS = [
  {
    term: "Akreditasi A",
    detail: "Peringkat mutu tertinggi yang diberikan BAN-S/M.",
  },
  {
    term: "ISO 21001:2018",
    detail: "Sistem manajemen sekolah mengikuti standar internasional.",
  },
  {
    term: "Sekolah Swasta",
    detail: "Terdaftar pada DATA Pendidikan Kementerian Pendidikan Dasar dan Menengah.",
  },
];

const CONTACTS = [
  {
    label: "Alamat",
    value: "Jl. Raya Pecantingan, RT 12 RW 04, Sekardangan, Kabupaten Sidoarjo, Jawa Timur",
  },
  {
    label: "Telepon",
    value: "031-99711857",
    href: "tel:+623199711857",
  },
  {
    label: "WhatsApp",
    value: "0811-3021-919",
    href: "https://wa.me/628113021919",
  },
  {
    label: "Email",
    value: "informasi@smktelkom-sda.sch.id",
    href: "mailto:informasi@smktelkom-sda.sch.id",
  },
];

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mark text-sm font-extrabold text-white">
              ST
            </span>
            <span className="flex flex-col text-sm font-bold leading-tight tracking-tight">
              <span>SMK Telkom</span>
              <span className="text-muted">Sidoarjo</span>
            </span>
          </a>

          <nav className="flex items-center gap-6 sm:gap-8">
            <ul className="hidden items-center gap-6 text-sm font-medium sm:flex sm:gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a className="hover:text-brand" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={PPDB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center whitespace-nowrap rounded-full bg-brand-soft px-5 text-sm font-semibold text-brand-contrast transition-colors hover:bg-brand-strong active:translate-y-px"
            >
              PPDB
            </a>
          </nav>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero: split layout, copy left, photo right, collapses to one column below 1024px */}
        <section className="mx-auto w-full max-w-6xl px-5 pt-20 pb-16 sm:px-8 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:pt-24 lg:pb-24">
          <div>
            <p className="text-sm font-semibold text-brand">
              Sekolah Menengah Kejuruan
            </p>
            <h1 className="mt-3 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">
              Sekolah <span className="text-brand">vokasi ICT</span> di Sidoarjo
            </h1>
            <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted sm:text-lg">
              Di bawah naungan Yayasan Pendidikan Telkom, kami melatih siswa di
              bidang jaringan komputer, perangkat lunak, dan audio video.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={PPDB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center whitespace-nowrap rounded-full bg-brand-soft px-7 font-semibold text-brand-contrast transition-colors hover:bg-brand-strong active:translate-y-px"
              >
                PPDB
              </a>
              <a
                href="#jurusan"
                className="inline-flex h-12 items-center whitespace-nowrap rounded-full border border-line px-7 font-semibold transition-colors hover:bg-surface active:translate-y-px"
              >
                Lihat jurusan
              </a>
            </div>
          </div>

          {/* TODO: ganti dengan foto asli sekolah (portrait 4:5) */}
          <div className="relative mt-10 min-h-80 flex-1 overflow-hidden rounded-2xl lg:mt-0 lg:h-[30rem]">
            <Image
              src="/images/hero.jpg"
              alt="Siswa SMK Telkom Sidoarjo mengikuti kegiatan belajar di kelas"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
            />
          </div>
        </section>

        {/* Program keahlian: asymmetric trio, one photo tile plus two flat tiles */}
        <section id="jurusan" className="scroll-mt-20 border-t border-line bg-surface">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Tiga Program Keahlian
            </h2>
            <p className="mt-3 max-w-[52ch] text-muted">
              Setiap siswa memilih satu dari tiga program keahlian berikut.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-12">
              <article className="flex flex-col overflow-hidden rounded-2xl border border-line bg-background md:col-span-7 md:row-span-2">
                {/* TODO: ganti dengan foto lab jaringan asli sekolah */}
                <div className="relative min-h-56 flex-1">
                  <Image
                    src="/images/lab.jpg"
                    alt="Laboratorium jaringan komputer SMK Telkom Sidoarjo"
                    fill
                    sizes="(max-width: 768px) 100vw, 58vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm font-bold text-brand">{PROGRAM.acronym}</p>
                  <h3 className="mt-1 text-lg font-bold tracking-tight">
                    {PROGRAM.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {PROGRAM.body}
                  </p>
                </div>
              </article>

              {MORE_PROGRAMS.map((program) => (
                <article
                  key={program.acronym}
                  className={
                    program.tone === "brand"
                      ? "rounded-2xl bg-brand p-6 text-brand-contrast md:col-span-5"
                      : "rounded-2xl border border-line bg-background p-6 md:col-span-5"
                  }
                >
                  <p
                    className={
                      program.tone === "brand"
                        ? "text-sm font-bold text-brand-contrast/80"
                        : "text-sm font-bold text-brand"
                    }
                  >
                    {program.acronym}
                  </p>
                  <h3 className="mt-1 text-lg font-bold tracking-tight">
                    {program.title}
                  </h3>
                  <p
                    className={
                      program.tone === "brand"
                        ? "mt-2 text-sm leading-relaxed text-brand-contrast/80"
                        : "mt-2 text-sm leading-relaxed text-muted"
                    }
                  >
                    {program.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* About: stacked heading, then a hairline separated fact row */}
        <section id="tentang" className="scroll-mt-20 border-t border-line">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <h2 className="max-w-[22ch] text-3xl font-extrabold tracking-tight sm:text-4xl">
              Sekolah Tangguh, Berakhlak, dan Berwawasan Digital
            </h2>
            <p className="mt-3 max-w-[52ch] text-muted">
              Sekolah vokasi yang berfokus pada bidang teknologi dan informatika.
            </p>

            <dl className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-line">
              {FACTS.map((fact) => (
                <div key={fact.term} className="sm:px-8 sm:first:pl-0">
                  <dt className="text-2xl font-extrabold tracking-tight text-brand sm:text-3xl">
                    {fact.term}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">
                    {fact.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Contact: definition list, one column on mobile */}
        <section id="kontak" className="scroll-mt-20 border-t border-line bg-surface">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Kunjungi Kami
            </h2>
            <dl className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-10">
              {CONTACTS.map((contact) => (
                <div key={contact.label}>
                  <dt className="text-sm font-semibold">{contact.label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">
                    {contact.href ? (
                      <a
                        href={contact.href}
                        target={contact.href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          contact.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="text-brand hover:underline"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      contact.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>SMK Telkom Sidoarjo. NPSN 69988281.</p>
          <a
            href={SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            smktelkom-sda.sch.id
          </a>
        </div>
      </footer>
    </>
  );
}
