import Link from "next/link";
import style from '../styles/navbar.module.scss';


export default function NavItem({ text, href, icon, active }) {
    return (
        <Link className={`nav__item ${active ? "active" : ""}`} href={`${href}`}>
            {icon}
            <span className={`${style.nav_menuName}`}>{text}</span>
        </Link>
    )
}