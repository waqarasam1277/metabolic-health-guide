import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="font-semibold tracking-tight">
          Metabolic Risk Calculator
        </Link>
        <nav className="flex items-center gap-2">
          <NavLink to="/" className={({ isActive }) => `text-sm px-3 py-2 rounded-md ${isActive ? "bg-secondary" : "hover:bg-secondary/60"}`}>
            Home
          </NavLink>
          <NavLink to="/patients" className={({ isActive }) => `text-sm px-3 py-2 rounded-md ${isActive ? "bg-secondary" : "hover:bg-secondary/60"}`}>
            Patients
          </NavLink>
          <Button asChild size="sm" variant="secondary">
            <a href="https://docs.lovable.dev/" target="_blank" rel="noreferrer">Help</a>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
