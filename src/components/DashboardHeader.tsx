import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

type DashboardHeaderProps = {
  profileName: string;
  profileAvatar: string;
  profileBgColor: string;
  label?: string;
};

export function DashboardHeader({
  profileName,
  profileAvatar,
  profileBgColor,
  label,
}: DashboardHeaderProps) {
  const displayText = label ? `${label} ${profileName}` : profileName;

  return (
    <header className="p-6 pb-2 flex items-center justify-between">
      <Link
        to="/"
        className="p-3 bg-white rounded-full shadow-sm text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft size={24} />
      </Link>
      <div
        className={cn(
          'px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2',
          profileBgColor,
        )}
      >
        <span>{profileAvatar}</span>
        {displayText}
      </div>
    </header>
  );
}
