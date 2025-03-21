"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";

export default function MenuLink({
  href,
  icon: Icon,
  label,
  isSidebarCollapsed = false,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  isSidebarCollapsed: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const content = (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors
          ${
            isActive
              ? "text-amber-900 bg-amber-100"
              : "text-gray-700 hover:bg-amber-50 hover:text-amber-700"
          }
          ${isSidebarCollapsed ? "justify-center" : ""}
        `}
    >
      <Icon
        className={isSidebarCollapsed ? "h4 w-4 flex-shrink-0" : "h-6 w-6"}
      />
      {!isSidebarCollapsed && <span>{label}</span>}
    </Link>
  );

  return isSidebarCollapsed ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    content
  );
}
