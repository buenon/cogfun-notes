import { ReactNode } from "react";
import { cn } from "@lib";

type NavigationHeaderProps = {
  leftAction?: ReactNode;
  center?: ReactNode;
  rightAction?: ReactNode;
  isSticky?: boolean;
  className?: string;
};

export function NavigationHeader({
  leftAction,
  center,
  rightAction,
  isSticky = false,
  className,
}: NavigationHeaderProps) {
  return (
    <header
      className={cn(
        "w-full px-6 py-3 flex items-center justify-between z-50",
        isSticky && "sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100",
        className
      )}
    >
      {/* Left Area */}
      <div className="flex-1 flex justify-start items-center min-w-[48px]">
        {leftAction}
      </div>

      {/* Center Area */}
      <div className="flex-shrink-0 flex justify-center items-center mx-4">
        {center}
      </div>

      {/* Right Area */}
      <div className="flex-1 flex justify-end items-center min-w-[48px]">
        {rightAction}
      </div>
    </header>
  );
}
