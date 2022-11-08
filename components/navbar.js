import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import style from '../styles/navbar.module.scss';
import NavItem from "./navitem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft, faSearch, faFileLines, faUserGroup, faChartLine, faGear, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const MENU_LIST = [{ text: "Invoices", href: "/invoices", icon: faFileLines }, { text: "Customers", href: "/customers", icon: faUserGroup }, { text: "Reports", href: "/reports", icon: faChartLine }, { text: "Settings", href: "/settings", icon: faGear }];
export default function Navbar() {
    const [expandedNav, setExpandedNav] = useState(true);
    const [activeIdx, setActiveIdx] = useState(-1);
    const [profileImage, setProfileImage] = useState("/images/profile_img.png");

    return (
        <div className={style.header}>
            <nav className={`nav ${expandedNav ? style.expanded : ""}`}>
                <Link href={"/"}>
                    {
                        expandedNav ?
                            <h3 className={`${style.mainHeading} main-heading`} onClick={() => { setActiveIdx(-1); }}>
                                Groovy <span className={`${style.green}`}>Invoice</span>
                            </h3> :
                            <h3 className={`${style.mainHeading} main-heading`} onClick={() => { setActiveIdx(-1); }}>
                                G<span className={`${style.green}`}>I</span>
                            </h3>
                    }
                </Link>

                <hr />

                <div className={`${style.profileDetailWrapper}`}>
                    <div className={`profileImageWrapper d-flex justify-content-center`}>
                        <Image className={`${style.profileImage}`} src={profileImage} width={45} height={45} alt="profile_Image" />
                    </div>
                    <div className={`${style.profileNameWrapper} justify-content-center`}>
                        <div className={`username`}>John Doe <span className={``}></span></div>
                    </div>
                    <div className={`${style.profileActionWrapper} justify-content-center`}>
                        <FontAwesomeIcon icon={faClockRotateLeft} />
                        <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div className={`${style.nav_menu_arrow} d-flex justify-content-center align-items-center`} onClick={() => { setExpandedNav(prevCheck => !prevCheck) }}>
                        <FontAwesomeIcon icon={expandedNav ? faArrowLeft : faArrowRight}></FontAwesomeIcon>
                    </div>
                </div>

                <hr />

                {expandedNav ?
                    <form className={`d-flex`} role="search">
                        <input className={`form-control me-2`} type="search" placeholder="Global Search" aria-label="Search" />
                        <i>
                            <FontAwesomeIcon icon={faSearch} />
                        </i>
                    </form>
                    :
                    <div className={`d-flex justify-content-center ${style.searchButtonWrapper}`}>
                        <button type="className" class="btn btn-outline-primary" style={{ width: '57px', height: '45px' }} onClick={() => { setExpandedNav(prevCheck => !prevCheck) }}>
                            <i>
                                <FontAwesomeIcon icon={faSearch} />
                            </i>
                        </button>
                    </div>
                }

                <div className={`${style.nav_menu_list}`}>
                    {MENU_LIST.map((menu, idx) => (
                        <div className={`${style.navItemWrapper} ${(activeIdx === idx) ? style.active : " "} d-flex align-item-center`} onClick={() => { setActiveIdx(idx); }} key={menu.text}>
                            <Link className="nav__item" active={activeIdx === idx} href={`${menu.href}`}><a><FontAwesomeIcon className={`${style.green}`} icon={menu.icon} /><span className={`${style.nav_menuName}`}>{menu.text}</span></a></Link>
                            {/* <NavItem active={activeIdx === idx}{...menu}></NavItem> */}
                        </div>))}
                </div>
            </nav>
        </div>
    )
}