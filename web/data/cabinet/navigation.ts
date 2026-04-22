import {
  CreditCard,
  Home,
  Layers,
  type LucideIcon,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";

export type CabinetNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const cabinetSidebarNav: CabinetNavItem[] = [
  { href: "/cabinet", label: "Дашборд", icon: Home },
  { href: "/cabinet/leads", label: "Лиды", icon: Users },
  { href: "/cabinet/pages", label: "Страницы", icon: Layers },
  { href: "/cabinet/growth", label: "Рост", icon: TrendingUp },
  { href: "/cabinet/payment", label: "Оплата", icon: CreditCard },
  { href: "/cabinet/settings", label: "Настройки", icon: Settings },
];

/** Те же пункты, что в сайдбаре: полный обход кабинета с телефона. */
export const cabinetBottomNav: CabinetNavItem[] = cabinetSidebarNav;
