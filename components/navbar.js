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
import { ToastMsgContext } from '@/context/ToastMsg.context';
import FaScrewAndWrench from '@/assets/icons/faScrewAndWrench.svg';
import { getCurrentUserDetails } from "@/services/profile.service";
import { NavExpandedState } from '@/context/NavState.context';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils.js';
import { usePathname } from "next/navigation";

const MENU_LIST = [{ key: 100, text: "Invoices", href: "/invoices", icon: <FaFileLines /> }, { key: 101, text: "Customers", href: "/customers", icon: <FaUserGroup /> }, { key: 102, text: "Reports", href: "/reports", icon: <FaChartLine /> }, { key: 103, text: "Settings", href: "/settings", icon: <FaGear />, subMenu: [{ key: 1031, text: "Users", href: "/users", icon: <FaUsers /> }, { key: 1032, text: "Config", href: "/configuration", icon: <FaScrewAndWrench /> }] }];
export default function Navbar() {
    const [activeIdx, setActiveIdx] = useState(-1);
    const pathname = usePathname();
    const { setToastList } = useContext(ToastMsgContext);
    const [profileImage, setProfileImage] = useState("/images/profile_img.png");
    const [errors, setErrors] = useState([]);
    const [hasNotification, setHasNotification] = useState(true)
    const [data, setData] = useState({
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        cellNumber: "",
        profileImage: "/images/profile_img.png"
    })
    const { navExpandedState, setNavExpandedState } = useContext(NavExpandedState);
    const [navItemExpanded, setNavItemExpanded] = useState(false);

    useEffect(() => {
        getLoggedUserDetails();
    }, [])

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

    const getLoggedUserDetails = async () => {
        try {
            const result = await getCurrentUserDetails();
            if (result.status == 200) {
                var data = result.data;
                setData({
                    id: data.id,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    cellNumber: data.cellNumber,
                    profileImage: "/images/profile_img.png"
                });
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
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
                                    <Image className={`${style.profileImage}`} src={data.profileImage} width={45} height={45} alt="profile_Image" />
                                </div>
                                <div className={`${style.profileNameWrapper} justify-content-center`}>
                                    <div className={`username`}>{data.firstName == null ? '-' : data.firstName} {data.lastName == null ? '-' : data.lastName} <span className={``}></span></div>
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
                                        <div className={`${style.navItemWrapper} d-flex align-item-center p-0 m-0`} onClick={() => { setNavItemExpanded(!navItemExpanded); }}>
                                            <NavList activeIdx={activeIdx} expanded={navItemExpanded} text={menu.text} icon={menu.icon} subMenu={menu.subMenu} setActiveIdx={setActiveIdx} setNavItemExpanded={setNavItemExpanded}></NavList>
                                        </div>
                                    </Fragment>
                                );
                            } else {
                                return (
                                    <div key={idx} className={`${style.navItemWrapper} ${(activeIdx === idx) ? style.active : " "} d-flex align-item-center`} onClick={() => { setActiveIdx(idx); }}>
                                        <NavItem active={activeIdx === idx} text={menu.text} href={menu.href} icon={menu.icon}></NavItem>
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