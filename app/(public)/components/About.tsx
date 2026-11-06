import Image from "next/image";

interface Title {
  header: string;
}
export default function About({ header }: Title) {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-white px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="relative min-h-[320px] overflow-hidden rounded-3xl shadow-xl sm:min-h-[440px]">
          <Image
            src="/images/slide4.jpg"
            alt="Teachers gathered together in a classroom"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
            A school for every possibility
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {header}
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Bright Future School has been shaping young minds for over 25 years.
            We believe every child is unique, and our mission is to help each
            student discover their strengths and reach their full potential.
          </p>
          <p className="mt-4 leading-7 text-slate-600">
            With dedicated teachers, small class sizes, and modern facilities,
            we create an environment where learning is joyful and meaningful.
          </p>
          <a
            href="#programs"
            className="mt-7 inline-flex items-center font-bold text-blue-700 transition hover:text-blue-900"
          >
            Discover our programs{" "}
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
