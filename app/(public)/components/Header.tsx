"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-bold tracking-tight text-slate-900 sm:text-xl"
          onClick={() => setIsOpen(false)}
        >
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-xl text-white"
          >
            B
          </span>
          <span>
            Bright Future
            <span className="block text-xs font-medium tracking-wide text-slate-500">
              SCHOOL
            </span>
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-2xl text-slate-700 transition hover:bg-slate-50 md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
        >
          <span aria-hidden="true">{isOpen ? "×" : "☰"}</span>
        </button>

        <nav
          id="primary-navigation"
          aria-label="Main navigation"
          className={`${
            isOpen ? "flex" : "hidden"
          } absolute left-0 right-0 top-full flex-col gap-1 border-b border-slate-200 bg-white p-5 shadow-lg md:static md:flex md:flex-row md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {[
            ["About", "#about"],
            ["Programs", "#programs"],
            ["Admissions", "#admission"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 md:px-0 md:py-1 md:hover:bg-transparent"
            >
              {label}
            </Link>
          ))}
          <div className="relative md:ml-1">
            <button
              type="button"
              aria-expanded={isLoginOpen}
              aria-haspopup="true"
              onClick={() => setIsLoginOpen((open) => !open)}
              className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 md:w-auto md:px-0 md:py-1 md:hover:bg-transparent"
            >
              Portal login <span aria-hidden="true">⌄</span>
            </button>
            {isLoginOpen && (
              <div className="mt-1 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg md:absolute md:right-0 md:top-full md:mt-3 md:min-w-48">
                {[
                  ["Student portal", "/login/student"],
                  ["Admin portal", "/login/admin"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => {
                      setIsLoginOpen(false);
                      setIsOpen(false);
                    }}
                    className="block px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href="#admission"
            onClick={() => setIsOpen(false)}
            className="mt-2 rounded-lg bg-blue-700 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-800 md:mt-0"
          >
            Apply now
          </Link>
        </nav>
      </div>
    </header>
  );
}
