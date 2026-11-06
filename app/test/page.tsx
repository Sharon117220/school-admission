"use client";

import NavButton from "../(public)/components/NavButton";

export default function TestPage() {
  const handleClick = (label: string) => {
    alert(`You clicked: ${label}`);
  };

  return (
    <div className="p-10 flex gap-4">
      <NavButton label="Home" onClick={handleClick} />
      <NavButton label="About" onClick={handleClick} />
      <NavButton label="Programs" onClick={handleClick} />
      <NavButton label="Contact" onClick={handleClick} />
    </div>
  );
}
