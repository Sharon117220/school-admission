import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-y-0 right-0 w-full md:w-[68%]">
        <Image
          src="/images/hero.jpg"
          alt="Outdoor running track and school sports field"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 68vw"
          className="object-cover object-center opacity-60"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/25 md:to-transparent" />
      <div className="relative mx-auto flex min-h-[min(760px,85vh)] max-w-7xl items-center px-6 py-24 sm:px-10 lg:px-12">
        <div className="max-w-3xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Admissions open for 2026–2027
          </p>
          <h1 className="text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            A bright future
            <span className="block text-amber-300">starts here.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-200 sm:text-xl">
            A place to learn, discover new strengths, and grow with confidence.
            Take the first step toward your child&apos;s next chapter.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#admission"
              className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-7 py-4 font-bold text-slate-950 shadow-lg shadow-amber-950/20 transition hover:-translate-y-0.5 hover:bg-amber-300"
            >
              Start an application
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </a>
            <a
              href="#programs"
              className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Explore our programs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
