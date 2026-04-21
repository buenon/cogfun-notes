import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { DICTIONARY } from "../lib/dictionary";

type DashboardHeaderProps = {
  profileName: string;
  profileAvatar: string;
  profileBgColor: string;
};

export function DashboardHeader({
  profileName,
  profileAvatar,
  profileBgColor,
}: DashboardHeaderProps) {
  const displayText = `${DICTIONARY.kidDashboard.box} ${profileName}`;

  return (
    <header className="p-6 pb-2 flex items-center justify-center">
      <div
        className={cn(
          "px-4 py-1.5 rounded-full text-sm font-bold flex items-center justify-center gap-2",
          profileBgColor,
        )}
      >
        <span>{profileAvatar}</span>
        {displayText}
      </div>
    </header>
  );
}
