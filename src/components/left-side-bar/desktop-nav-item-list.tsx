import type { Tables } from "@/lib/types/supabase";
import { NavItem } from "./nav-item";
import { SettingsIcon } from "@/icons/settings-icon";
import { LogOutButton } from "./logout-button";
import { LogOutIcon } from "@/icons/logout-icon";

export const DesktopNavItemList = (props: {
  items: Array<{ href: string; title: string; icon: React.ReactNode }>;
  user: Tables<"users">;
}) => {
  return (
    <nav className="hidden h-full w-full flex-col items-start justify-start gap-1 px-4 py-5 lg:flex">
      {props.items.map((item) => {
        return (
          <NavItem key={item.href} href={item.href} title={item.title}>
            {item.icon}
          </NavItem>
        );
      })}
      <NavItem href="/dashboard/configuracion" title="Configuración">
        <SettingsIcon width={20} height={20} />
      </NavItem>
      <LogOutButton title="Cerrar sesión">
        <LogOutIcon width={20} height={20} />
      </LogOutButton>
    </nav>
  );
};
