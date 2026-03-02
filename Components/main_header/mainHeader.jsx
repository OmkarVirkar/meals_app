import Link from "next/link";
import LogoPng from "@/assets/logo.png";
import MainHeaderStyles from "./main-header.module.css";
import Image from "next/image";
import MainHeaderBackground from "./mainHeaderBackground";
import NavLink from "../NavLinks/NavLink";

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={MainHeaderStyles.header}>
        <Link className={MainHeaderStyles.logo} href="/">
          <Image src={LogoPng} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>
        <nav className={MainHeaderStyles.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
