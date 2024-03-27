"use client"
import { useState, useContext, Fragment, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import style from '@/styles/navbar.module.scss';
import NavItem from "./navitem";
import NavList from "./navlist";
import FaChartLine from '@/assets/icons/faChartLine.svg';
import FaEnvelope from '@/assets/icons/faEnvelope.svg';
import FaClockRotateLeft from '@/assets/icons/faClockRotateLeft.svg';
import FaFileLines from '@/assets/icons/faFileLines.svg';
import FaUserGroup from '@/assets/icons/faUserGroup.svg';
import FaGear from '@/assets/icons/faGear.svg';
import FaLogout from '@/assets/icons/faLogout.svg';
import FaUsers from '@/assets/icons/faUsers.svg';
import FaArrowLeft from '@/assets/icons/faArrowLeft.svg';
import FaArrowRight from '@/assets/icons/faArrowRight.svg';
import FaSearch from '@/assets/icons/faSearch.svg';
import FaBreifcase from '@/assets/icons/faBriefcase.svg';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import FaScrewAndWrench from '@/assets/icons/faScrewAndWrench.svg';
import { NavExpandedState } from '@/context/NavState.context';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils.js';
import { usePathname } from "next/navigation";
import defaultProfile from '../public/images/default_profile_icon.png';
import { useCurrentUserData } from "@/context/CurrentUserData.context"

const MENU_LIST = [{ key: 100, text: "Invoices", href: "/invoices", icon: <FaFileLines /> }, { key: 101, text: "Customers", href: "/customers", icon: <FaUserGroup /> }, { key: 102, text: "Reports", href: "/reports", icon: <FaChartLine /> }, { key: 103, text: "Settings", href: "/settings", icon: <FaGear />, subMenu: [{ key: 1031, text: "Users", href: "/users", icon: <FaUsers /> }, { key: 1032, text: "Organization", href: "/organization", icon: <FaBreifcase /> }, { key: 1033, text: "Config", href: "/configuration", icon: <FaScrewAndWrench /> }] }];

export default function Navbar() {
    const [activeIdx, setActiveIdx] = useState(-1);
    const pathname = usePathname();
    const { setToastList } = useContext(ToastMsgContext);
    const [errors, setErrors] = useState([]);
    const [hasNotification, setHasNotification] = useState(true)
    const { userInfo } = useCurrentUserData();
    const [image, setImage] = useState('');
    const { navExpandedState, setNavExpandedState } = useContext(NavExpandedState);
    const [navItemExpanded, setNavItemExpanded] = useState(false);

    useEffect(() => {
        for (let i = 0; i < MENU_LIST.length; i++) {
            if (pathname.search(MENU_LIST[i].href) != -1) {
                setActiveIdx(i);
                break;
            }
        }
    }, [pathname])

    useEffect(() => {
        var temp_ = activeIdx;
        if (typeof activeIdx == 'string' && temp_.search("sub") > -1) {
            setNavItemExpanded(true);
        }
    }, [activeIdx]);

    useEffect(() => {
        setImage(userInfo.userProfileImage);
    }, [userInfo.userProfileImage])

    const imageLoader = ({ src, width, quality }) => {
        return (`${src}?w=${width}&q=${quality || 75}`);
    }

    return (
        <div className={style.header}>
            <nav className={`nav ${navExpandedState ? style.expanded : ""}`}>
                <div className={`${style.navHeadingWrapper} d-flex justify-content-between`}>
                    <Link href={"/dashboard"}>
                        <h3 className={`${style.mainHeading} main-heading`} onClick={() => { setActiveIdx(-1); }}>
                        </h3>
                    </Link>

                    <span className={`${style.hamburgerMenu} ${navExpandedState ? style.active : ""}`} onClick={() => { setNavExpandedState(prevCheck => !prevCheck) }}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </span>
                </div>

                <hr />
                <div className={`${style.wrapperForMobileScreen}`}>
                    <div className={`${style.profileDetailWrapper}`}>
                        <Link href={"/profile"}>
                            <span className="d-flex flex-column" onClick={() => { setActiveIdx('-1') }}>
                                <div className={`profileImageWrapper d-flex justify-content-center`}>
                                    <Image src={image || defaultProfile} className={`${style.profileImage}`} loader={imageLoader} onError={() => setImage(defaultProfile)} width={45} height={45} unoptimized alt="profile_Image" />
                                </div>
                                <div className={`${style.profileNameWrapper} justify-content-center`}>
                                    <div className={`username`}>{userInfo.userName == "" ? '- -' : userInfo.userName}<span className={``}></span></div>
                                </div>
                            </span>
                        </Link>
                        <div className={`${style.profileActionWrapper}`}>
                            <Link href={"/"}>
                                <FaClockRotateLeft />
                            </Link>
                            <Link className={hasNotification ? style.hasNotification : ""} href={"/notification"}>
                                <FaEnvelope />
                            </Link>
                            <Link href={"/logout"}>
                                <FaLogout />
                            </Link>
                        </div>
                        <div className={`${style.nav_menu_arrow} d-flex justify-content-center align-items-center`} onClick={() => { setNavExpandedState(prevCheck => !prevCheck) }}>
                            {navExpandedState ? <FaArrowLeft /> : <FaArrowRight />}
                        </div>
                    </div>
                    <hr />

                    {navExpandedState ?
                        <form className={`d-flex`} role="search">
                            <input className={`form-control me-2`} type="search" placeholder="Global Search" aria-label="Search" />
                            <i>
                                <FaSearch />
                            </i>
                        </form>
                        :
                        <div className={`d-flex justify-content-center ${style.searchButtonWrapper}`}>
                            <button className="btn btn-outline-primary" style={{ width: '57px', height: '45px' }} onClick={() => { setNavExpandedState(prevCheck => !prevCheck) }}>
                                <i>
                                    <FaSearch />
                                </i>
                            </button>
                        </div>
                    }

                    <div className={`${style.nav_menu_list}`}>
                        {MENU_LIST.map(function (menu, idx) {
                            if (menu.text === 'Settings') {
                                return (
                                    <Fragment key={idx}>
                                        <hr />
                                        <div className={`${style.navItemWrapper} ${style.subNavItemWrapper} d-flex align-item-center p-0 m-0`} onClick={() => { setNavItemExpanded(!navItemExpanded); }}>
                                            <NavList activeIdx={activeIdx} expanded={navItemExpanded} text={menu.text} icon={menu.icon} subMenu={menu.subMenu} setActiveIdx={setActiveIdx} setNavItemExpanded={setNavItemExpanded} style={style}></NavList>
                                        </div>
                                    </Fragment>
                                );
                            } else {
                                return (
                                    <div key={idx} className={`${style.navItemWrapper} ${(activeIdx === idx) ? style.active : " "} d-flex align-item-center`} onClick={() => { setActiveIdx(idx); }}>
                                        <NavItem active={activeIdx === idx} text={menu.text} href={menu.href} icon={menu.icon} style={style}></NavItem>
                                    </div>
                                );
                            }
                        })}
                    </div>

                </div>

            </nav>
        </div>
    )
}