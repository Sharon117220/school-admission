import { programs } from "../data/data";
import ProgramCard from "./ProgramCard";
import Section from "./Section";

export default function Programs() {
  return (
    <Section id="programs" title="Learning for every stage" bg="bg-slate-50">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {programs.map((p) => (
          <ProgramCard
            key={p.id}
            icon={p.icon}
            title={p.title}
            grades={p.grades}
            description={p.description}
          />
        ))}
      </div>
    </Section>
  );
}
