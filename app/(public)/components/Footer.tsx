import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 px-5 pb-6 pt-14 text-white sm:px-8">
      <div className="mx-auto mb-10 grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link href="/" className="text-xl font-bold tracking-tight">
            Bright Future School
          </Link>
          <p className="mt-4 max-w-sm leading-7 text-slate-400">
            A welcoming community where students learn with confidence and
            discover what they can become.
          </p>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            Explore
          </h2>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><Link href="#about" className="hover:text-white">About</Link></li>
            <li><Link href="#programs" className="hover:text-white">Programs</Link></li>
            <li><Link href="#admission" className="hover:text-white">Admissions</Link></li>
            <li><Link href="#contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            Portals
          </h2>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><Link href="/login/student" className="hover:text-white">Student sign in</Link></li>
            <li><Link href="/login/admin" className="hover:text-white">Administrator sign in</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-slate-800 pt-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Bright Future School. All rights reserved.</p>
        <p>Learning today. Leading tomorrow.</p>
      </div>
    </footer>
  );
}
