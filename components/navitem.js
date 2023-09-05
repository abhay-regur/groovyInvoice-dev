import Link from "next/link";
import style from '@/styles/navbar.module.scss';


export default function NavItem({ text, href, icon, active }) {
    return (
        <Link className={`nav__item ${active ? "active" : ""}`} href={`${href}`}>
            <div className={`${style.nav_item_innerwrapper}`}>
                {icon}
                <span className={`${style.nav_menuName}`}>{text}</span>
            </div>
        </Link>
    )
}