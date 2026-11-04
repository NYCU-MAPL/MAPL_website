export type NavigationDestination = Readonly<{
  label: string
  to: string
}>

export const primaryDestinations = [
  { label: "Home", to: "/" },
  { label: "Members", to: "/members" },
  { label: "Publications", to: "/publications" },
  { label: "Teaching", to: "/teaching" },
  { label: "Join Us", to: "/join-us" },
] as const satisfies readonly NavigationDestination[]
