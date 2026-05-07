import { cn, D } from "@lib";

export type ProfileBadgeProps = {
  profileName: string;
  profileAvatar: string;
  profileBgColor: string;
  onClick?: () => void;
  className?: string;
};

export function ProfileBadge({
  profileName,
  profileAvatar,
  profileBgColor,
  onClick,
  className,
}: ProfileBadgeProps) {
  const displayText = `${D.kidDashboard.box} ${profileName}`;

  return (
    <div
      onClick={onClick}
      className={cn(
        "px-4 py-1.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm border border-black/5 select-none",
        profileBgColor,
        className
      )}
    >
      <span className="text-base">{profileAvatar}</span>
      <span className="whitespace-nowrap">{displayText}</span>
    </div>
  );
}
