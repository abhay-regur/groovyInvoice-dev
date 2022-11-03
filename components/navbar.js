import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import style from '../styles/navbar.module.scss';
import NavItem from "./navitem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft, faSearch, faFileLines, faUserGroup, faChartLine, faGear } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const MENU_LIST = [{ text: "Invoices", href: "/invoices", icon: faFileLines }, { text: "Customers", href: "/customers", icon: faUserGroup }, { text: "Reports", href: "/reports", icon: faChartLine }, { text: "Settings", href: "/settings", icon: faGear }];
export default function Navbar() {
    const [navActive, setNavActive] = useState(null);
    const [activeIdx, setActiveIdx] = useState(-1);
    const [profileImage, setProfileImage] = useState("/images/profile_img.png");

    return (
        <div className={style.header}>
            <nav className={`nav`}>
                <Link href={"/"}>
                    <h3 className={`${style.mainHeading} main-heading`}>Groovy <span className={`${style.green}`}>Invoice</span></h3>
                </Link>

                <hr />

                <div className={`${style.profileDetailWrapper}`}>
                    <div className={`profileImageWrapper d-flex justify-content-center`}>
                        <Image className={`${style.profileImage}`} src={profileImage} width={45} height={45} alt="profile_Image" />
                    </div>
                    <div className={`${style.profileNameWrapper} d-flex justify-content-center`}>
                        <div className={`username`}>John Doe <span className={``}></span></div>
                    </div>
                    <div className={`${style.profileActionWrapper} d-flex justify-content-center`}>
                        <FontAwesomeIcon icon={faClockRotateLeft} />
                        <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                </div>

                <hr />

                <form className={`d-flex`} role="search">
                    <input className={`form-control me-2`} type="search" placeholder="Global Search" aria-label="Search" />
                    <i>
                        <FontAwesomeIcon icon={faSearch} />
                    </i>
                </form>

                <div className={`${style.nav_menu_list}`}>
                    {MENU_LIST.map((menu, idx) => (
                        <div className={`${style.navItemWrapper} ${navActive ? style.active : ""} d-flex align-item-center`} onClick={() => { setActiveIdx(idx); setNavActive(false); }} key={menu.text}>
                            <FontAwesomeIcon className={`${style.green}`} icon={menu.icon} /><NavItem active={activeIdx === idx}{...menu}></NavItem>
                        </div>))}
                </div>
            </nav>
        </div>
    )
}