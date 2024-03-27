import Link from "next/link";


export default function NavItem({ text, href, icon, active, style }) {
    return (
        <Link className={`nav_item ${style.nav_subItem} ${active ? "active" : ""}`} href={`${href}`}>
            <div className={`${style.nav_item_innerwrapper}`}>
                {icon}
                <span className={`${style.nav_menuName}`}>{text}</span>
            </div>
        </Link>
    )
}