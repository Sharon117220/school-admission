type ProgramCardProps = {
  icon: string;
  title: string;
  grades: string;
  description: string;
};

export default function ProgramCard({
  icon,
  title,
  grades,
  description,
}: ProgramCardProps) {
  return (
    <article className="h-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div
        aria-hidden="true"
        className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl"
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm font-bold text-blue-700">{grades}</p>
      <p className="mt-4 leading-7 text-slate-600">{description}</p>
    </article>
  );
}
