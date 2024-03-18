import Link from "next/link";
import style from '@/styles/navbar.module.scss';


export default function NavList({ activeIdx, expanded, text, icon, subMenu, setActiveIdx, setNavItemExpanded }) {
    return (
        <div className={`${style.dropdownWrapper} d-flex`}>
            <div className={`nav__item ${style.dropdownNavitem}`}>
                <div className={`${style.nav_item_innerwrapper}`}>
                    {icon}
                    <span className={`${style.nav_menuName}`}>{text}</span>
                </div>
            </div>
            <div className={`${expanded ? style.expanded : ''} ${style.dropdownNavitemWrapper}`}>
                {subMenu.map(function (menu, idx) {
                    return (
                        <div className={`${(activeIdx === "sub-" + idx) ? style.active : " "} ${style.navItemListWrapper}`} key={idx} onClick={() => { setActiveIdx("sub-" + idx); setNavItemExpanded(true) }}>
                            <Link className="dropdown-item" href={`${menu.href}`}>
                                <div className={`${style.nav_item_innerwrapper}`}>
                                    {menu.icon}
                                    <span className={`${style.nav_menuName}`}>{menu.text}</span>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}