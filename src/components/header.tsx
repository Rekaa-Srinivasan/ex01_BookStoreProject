"use client";
import { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { logout } from "@/app/logout/page";


const headerData = {
    navLinks: [
        { link: '/home', linkName: 'Home' },
        { link: '/pages', linkName: 'Pages' },
        { link: '/about', linkName: 'About' },
        { link: '/store', linkName: 'Services' },
        { link: '/contact', linkName: 'Contact' },
    ],
    socialMediaLinks : [
        { link: 'https://facebook.com', icon: FaFacebookSquare }, 
        { link: 'https://twitter.com', icon: FaTwitterSquare, }, 
        { link: 'https://linkedin.com', icon: FaLinkedin, }, 
    ],
}

const NavLinks = headerData.navLinks.map((navLinks) => {
    return (
        <Link href={navLinks.link}>
            <li className="lg:float-left font-inter font-normal text-tertiary-bg-color text-sm xl:text-m py-2 lg:py-0 active:text-primary-color active:bg-tertiary-bg-color active:font-bold">{navLinks.linkName}</li>
        </Link>
    )
});

const SocialMedia = headerData.socialMediaLinks.map((media: any) => {
    return (
        <Link href={media.link}><media.icon className="text-white" size={27} /></Link>
    )
});

export default function Header() {
    const [menuDisplay, setmenuDisplay] = useState("block");
    function handleMenus(display: string) {
        setmenuDisplay(display);
    }
    const [showLogout, setShowLogout] = useState('block');
    function handleLogoutOption(value: string) {
        setShowLogout(value);
    }

    const router = useRouter();
    function logOut() {
        logout();
        router.push('http://localhost:3000/logout');
    }
    // let cartInfo: any = JSON.stringify({cart: 0});
    // useEffect(() => {
    //     if(localStorage.getItem('cart')) {
    //         cartInfo = localStorage.getItem('cart');
    //     }
    // }, [localStorage.getItem('cart')]);
    // cartInfo = JSON.parse(cartInfo);
    // console.log(cartInfo);
    return (
        <nav className="navbar navigation-bar-container bg-primary-color flex flex-col lg:flex-row px-4 py-2 md:px-20 md:py-4 justify-between gap-1">
            <div className="icon flex flex-row gap-8 items-center">
                <Image className="store_logo w-mobile-logo lg:w-logo" src="/images/logo.png" alt="logo" width={100} height={100}/>
                <h3 className="storeName justify-end mr-auto font-inter font-bold text-m lg:text-l text-tertiary-bg-color">Pages</h3>
                <div className="icons flex flex-row gap-3">
                    {SocialMedia}
                </div>
                <RxHamburgerMenu onClick={() => { handleMenus(menuDisplay == "hidden" ? "block" : "hidden") }} className="hamburger-icon text-xl text-white block lg:hidden" />
            </div>
            <div className={`menus ${menuDisplay === "hidden" ? "block" : "hidden"} lg:flex lg:flex-row lg:gap-12 lg:items-center`}>
                <ul className="lg:flex lg:gap-8 xl:gap-12">
                    {NavLinks}
                    <Link href="/cart">
                        <li className="lg:float-left font-inter font-normal text-tertiary-bg-color text-sm xl:text-m py-2 lg:py-0 active:text-primary-color active:bg-tertiary-bg-color active:font-bold relative">
                            <FiShoppingCart className="text-white" size={24} />
                            <FaCircle className="text-quaternary-color absolute top-0 left-4" ></FaCircle>
                            <span className="text-primary-color absolute top-0 left-4 pl-1 text-[10px]">0</span>
                        </li>
                    </Link>
                </ul>
                <Link href="/">
                    <FaUser className="text-white inline" size={22} />
                    <MdKeyboardArrowDown className={`text-white ${typeof localStorage !== 'undefined' ? (localStorage.getItem('user') ? 'inline' : 'hidden') : 'hidden' }`} onClick={() => handleLogoutOption(showLogout === 'block' ? 'hidden' : 'block')} />
                    <div onClick={() => { logOut() }} className={`${showLogout === 'block' ? 'hidden' : 'block'} cursor-pointer border border-solid border-quaternary-color mt-2 bg-white font-cardo text-primary-color text-m px-3 py-0.5`}>Logout</div>
                </Link>
            </div>
        </nav>
    );
}