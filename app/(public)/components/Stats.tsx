import { stats } from "../data/data";
import StatCard from "./StatCard";
export default function Stats() {
  return (
    <section className="bg-blue-50 py-14 px-5">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((s) => (
          <StatCard key={s.id} value={s.value} label={s.label} />
        ))}
      </div>
    </section>
  );
}
