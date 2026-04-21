import { User, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { cn, D } from "@lib";

const MODE_CARDS = [
  {
    to: "/parent",
    icon: Users,
    title: D.app.parentMode,
    description: D.app.parentModeDesc,
    className:
      "bg-indigo-100 text-indigo-900 border-2 border-indigo-200 hover:bg-indigo-50 hover:shadow-md",
  },
  {
    to: "/kid",
    icon: User,
    title: D.app.kidMode,
    description: D.app.kidModeDesc,
    className:
      "bg-orange-100 text-orange-900 border-2 border-orange-200 hover:bg-orange-50 hover:shadow-md",
  },
] as const;

export function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 max-w-md mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-2">
          {D.app.title}
        </h1>
        <p className="text-slate-500 font-medium">{D.app.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full">
        {MODE_CARDS.map(({ to, icon: Icon, title, description, className }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              "flex items-center justify-center p-8 rounded-3xl transition-all shadow-sm",
              className,
            )}
          >
            <Icon size={32} className="me-4" />
            <div className="text-start">
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="opacity-80 font-medium">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
