import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import style from '../styles/navbar.module.scss';
import NavItem from "./navitem";
import FaChartLine from '../assets/icons/faChartLine.svg';
import FaEnvelope from '../assets/icons/faEnvelope.svg';
import FaClockRotateLeft from '../assets/icons/faClockRotateLeft.svg';
import FaFileLines from '../assets/icons/faFileLines.svg';
import FaUserGroup from '../assets/icons/faUserGroup.svg';
import FaGear from '../assets/icons/faGear.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const MENU_LIST = [{ key: 100, text: "Invoices", href: "/invoices", icon: <FaFileLines /> }, { key: 101, text: "Customers", href: "/customers", icon: <FaUserGroup /> }, { key: 102, text: "Reports", href: "/reports", icon: <FaChartLine /> }, { key: 103, text: "Settings", href: "/settings", icon: <FaGear /> }];
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
                            <FaClockRotateLeft />
                            <FaEnvelope />
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
                                    <div key={menu.id} className={`${style.navItemWrapper} ${(activeIdx === idx) ? style.active : " "} d-flex align-item-center`} onClick={() => { setActiveIdx(idx); setNavExpandedState(false) }}>
                                        <NavItem active={activeIdx === idx}{...menu}></NavItem>
                                    </div>
                                </>;
                            }
                            else {
                                return <div key={menu.id} className={`${style.navItemWrapper} ${(activeIdx === idx) ? style.active : " "} d-flex align-item-center`} onClick={() => { setActiveIdx(idx); setNavExpandedState(false) }}>
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