import { BookOpen, Users } from "lucide-react";

export const BLOG_URL = "https://blog.lagrangeengineering.ro";

export const companyLinks = [
  {
    titleKey: "footer.blog",
    Icon: BookOpen,
    href: BLOG_URL,
    external: true,
  },
  {
    titleKey: "footer.about",
    Icon: Users,
    href: "/about",
  },
];
