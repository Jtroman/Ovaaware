export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "OvaAware",
  description:
    "Personalized ovarian cancer risk assessment and guidance.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Assessment",
      href: "/assessment",
    },
    {
      title: "Profile",
      href: "/profile",
    },
  ],
  links: {
    // Add external links if any, e.g. GitHub, Twitter
  },
}
