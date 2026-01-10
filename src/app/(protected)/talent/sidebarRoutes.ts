export type Route = {
  label: string
  href: string
  // use a string key for icons so we don't pass functions from server -> client
  icon?: string
}

export const talentSidebarRoutes: Route[] = [
  { label: "Overview", href: "/talent", icon: "HomeIcon" },
  { label: "My Profile", href: "/talent/profile", icon: "UserIcon" },
  { label: "Vetting Status", href: "/talent/vetting", icon: "CheckCircleIcon" },
  { label: "Settings", href: "/talent/settings", icon: "SettingsIcon" },
]

export default talentSidebarRoutes
