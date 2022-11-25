import Link from "next/link";
import style from '../styles/navbar.module.scss';


export default function NavItem({ text, href, icon, active }) {
    return (
        <Link className={`nav__item ${active ? "active" : ""}`} href={`${href}`}>
            <a>{icon}
                <span className={`${style.nav_menuName}`}>{text}</span>
            </a>
        </Link>
    )
}