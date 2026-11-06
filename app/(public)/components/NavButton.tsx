type NavButtonProps = {
  label: string;
  onClick: (label: string) => void;
};

export default function NavButton({ label, onClick }: NavButtonProps) {
  return (
    <button
      onClick={() => onClick(label)}
      className="px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition"
    >
      {label}
    </button>
  );
}
