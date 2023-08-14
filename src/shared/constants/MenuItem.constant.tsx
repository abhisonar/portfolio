import {
  Home,
  Info,
  GraduationCap,
  TerminalSquare,
  SquareCode,
  FolderKanban,
} from "lucide-react";
import { IMenu } from "../interfaces/menu.interface";

export const MENU_ITEMS: IMenu[] = [
  {
    id: 1,
    title: "Home",
    icon: <Home />,
    href: "hero-section",
  },
  {
    id: 2,
    title: "About",
    icon: <Info />,
    href: "about-section",
  },
  {
    id: 3,
    title: "Education",
    icon: <GraduationCap />,
    href: "education-section",
  },
  {
    id: 4,
    title: "Experience",
    icon: <TerminalSquare />,
    href: "experience-section",
  },
  {
    id: 5,
    title: "Skills",
    icon: <SquareCode />,
    href: "skills-section",
  },
  {
    id: 6,
    title: "Projects",
    icon: <FolderKanban />,
    href: "projects-section",
  },
];
