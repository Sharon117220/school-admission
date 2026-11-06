type SectionProps = {
  id?: string;
  title: string;
  bg?: string;
  children: React.ReactNode;
};

export default function Section({
  id,
  title,
  bg = "",
  children,
}: SectionProps) {
  return (
    <section id={id} className={`py-20 px-5 ${bg}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          {title}
        </h2>
        {children} {}
      </div>
    </section>
  );
}
