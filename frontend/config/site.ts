export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "ยินดีต้อนรับสู่แหล่งเรียนรู้วิทยาลัยพยาบาลพระจอมเกล้าจังหวัดเพชรบุรี",
  description: "ก้าวเข้าสู่โลกแห่งความรู้ด้านการพยาบาลเด็กและวัยรุ่น ที่ผสานเทคโนโลยีการเรียน การสอนสมัยใหม่เข้ากับประสบการณ์จริงเพื่อเตรียมความพร้อมในการฝึกปฎิบัติ",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Courses",
      href: "/courses",
    }
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
