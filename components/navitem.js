import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from '../styles/navbar.module.scss';

export default function NavItem({ text, href, icon, active }) {
    return (
        <Link className={`nav__item ${active ? "active" : ""}`} href={`${href}`}>
            <a><FontAwesomeIcon className={`green`} icon={icon} />
                <span className={`${style.nav_menuName}`}>{text}</span>
            </a>
        </Link>
    )
}