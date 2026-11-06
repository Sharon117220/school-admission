export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 bg-blue-50 px-5 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
            We are here to help
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Let&apos;s talk about your child&apos;s next step.
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Have questions about admissions? Reach out to our school team.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <ContactItem
            icon="📍"
            label="Visit us"
            value="123 Education Lane, City"
          />
          <ContactItem
            icon="📞"
            label="Call admissions"
            value="(555) 123-4567"
            href="tel:+15551234567"
          />
          <ContactItem
            icon="✉️"
            label="Email admissions"
            value="admissions@brightfuture.edu"
            href="mailto:admissions@brightfuture.edu"
          />
        </div>
      </div>
    </section>
  );
}

// 👇 Our reusable child component using props
type ContactItemProps = {
  icon: string;
  label: string;
  value: string;
  href?: string;
};

function ContactItem({ icon, label, value, href }: ContactItemProps) {
  return (
    <article className="rounded-2xl border border-blue-100 bg-white p-7 shadow-sm">
      <div aria-hidden="true" className="mb-4 text-3xl">{icon}</div>
      <h3 className="font-bold text-slate-900">{label}</h3>
      {href ? (
        <a
          href={href}
          className="mt-2 inline-block text-slate-600 underline decoration-blue-300 underline-offset-4 hover:text-blue-700"
        >
          {value}
        </a>
      ) : (
        <p className="mt-2 text-slate-600">{value}</p>
      )}
    </article>
  );
}
