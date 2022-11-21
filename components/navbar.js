import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import style from '../styles/navbar.module.scss';
import NavItem from "./navitem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft, faSearch, faFileLines, faUserGroup, faChartLine, faGear, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const MENU_LIST = [{ text: "Invoices", href: "/invoices", icon: faFileLines }, { text: "Customers", href: "/customers", icon: faUserGroup }, { text: "Reports", href: "/reports", icon: faChartLine }, { text: "Settings", href: "/settings", icon: faGear }];
export default function Navbar({ navExpandedState, setNavExpandedState }) {
    const [activeIdx, setActiveIdx] = useState(-1);
    const [profileImage, setProfileImage] = useState("/images/profile_img.png");

    return (
        <div className={style.header}>
            <nav className={`nav ${navExpandedState ? style.expanded : ""}`}>
                <div className={`${style.navHeadingWrapper} d-flex justify-content-between`}>
                    <Link href={"/"}>
                        <h3 className={`${style.mainHeading} main-heading`} onClick={() => { setActiveIdx(-1); setNavExpandedState(false) }}>
                        </h3>
                    </Link>

                    <span className={`${style.hamburgerMenu} ${navExpandedState ? style.active : style.no_animation}`} onClick={() => { setNavExpandedState(prevCheck => !prevCheck) }}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </span>

                </div>


                <hr />
                <div className={`${style.wrapperForMobileScreen}`}>
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
                        <div className={`${style.nav_menu_arrow} d-flex justify-content-center align-items-center`} onClick={() => { setNavExpandedState(prevCheck => !prevCheck) }}>
                            <FontAwesomeIcon icon={navExpandedState ? faArrowLeft : faArrowRight}></FontAwesomeIcon>
                        </div>
                    </div>

                    <hr />

                    {navExpandedState ?
                        <form className={`d-flex`} role="search">
                            <input className={`form-control me-2`} type="search" placeholder="Global Search" aria-label="Search" />
                            <i>
                                <FontAwesomeIcon icon={faSearch} />
                            </i>
                        </form>
                        :
                        <div className={`d-flex justify-content-center ${style.searchButtonWrapper}`}>
                            <button className="btn btn-outline-primary" style={{ width: '57px', height: '45px' }} onClick={() => { setNavExpandedState(prevCheck => !prevCheck) }}>
                                <i>
                                    <FontAwesomeIcon icon={faSearch} />
                                </i>
                            </button>
                        </div>
                    }

                    <div className={`${style.nav_menu_list}`}>
                        {MENU_LIST.map(function (menu, idx) {
                            if (menu.text == 'Settings') {
                                return <>
                                    <hr />
                                    <div className={`${style.navItemWrapper} ${(activeIdx === idx) ? style.active : " "} d-flex align-item-center`} onClick={() => { setActiveIdx(idx); setNavExpandedState(false) }} key={idx}>
                                        <NavItem active={activeIdx === idx}{...menu}></NavItem>
                                    </div>
                                </>;
                            }
                            else {
                                return <div className={`${style.navItemWrapper} ${(activeIdx === idx) ? style.active : " "} d-flex align-item-center`} onClick={() => { setActiveIdx(idx); setNavExpandedState(false) }} key={idx}>
                                    <NavItem active={activeIdx === idx}{...menu}></NavItem>
                                </div>
                            }

                        })}
                    </div>

                </div>

            </nav>
        </div>
    )
}