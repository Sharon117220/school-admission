type StatCardProps = {
  value: string;
  label: string;
};
export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div>
      <p className="text-3xl md:text-4xl font-bold text-blue-700">{value}</p>
      <p className="text-gray-600 mt-1">{label}</p>
    </div>
  );
}
