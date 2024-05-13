import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const footerData = {
    socialMediaLinks : [
        { link: 'https://facebook.com', icon: FaFacebookF }, 
        { link: 'https://twitter.com', icon: FaTwitter, }, 
        { link: 'https://linkedin.com', icon: FaLinkedinIn, }, 
        { link: 'https://instagram.com', icon: FaInstagram, }
    ],
    exploreList : [
        {link: '', linkName: 'Home'},
        {link: '', linkName: 'About Us'},
        {link: '/store', linkName: 'Services'},
        {link: '', linkName: 'Appointments'},
        {link: '/blog', linkName: 'Blogs'},
        {link: '', linkName: 'Contact Us'},
    ],
    utilityPages : [
        {link: '', linkName: 'Start Here'},
        {link: '', linkName: 'Style Guide'},
        {link: '', linkName: '404 Not Found'},
        {link: '', linkName: 'Password Protected'},
        {link: '', linkName: 'Licenses'},
        {link: '', linkName: 'Changelog'},
    ],
    contactDetails : [
        { contact: 'Address : ', address: '24A Kingston St, Los Vegas NC 28202, USA.' },
        { contact: 'Mail : ', address: 'support@doctors.com' },
        { contact: 'Phone : ', address: '(+22) 123 - 4567 - 900' }
    ]
}
const SocialMedia = footerData.socialMediaLinks.map((media: any) => {
    return (
        <Link className="icon_links inline-block border border-solid border-quaternary-color px-2.5 py-2 m-0.5" href={media.link}>
            <media.icon className="text-white"/>
        </Link>
    )
});
const UtilityPages = footerData.utilityPages.map((utility) => {
    return (
        <li className="font-inter text-banner-secondary-font-color text-sm font-normal py-1">
            <FaRegCircle className="text-quaternary-color text-[5px] inline pr-0.5"/>
            <FaRegCircle className="text-quaternary-color text-[5px] inline pr-0.5"/>
            <FaRegCircle className="text-quaternary-color text-[5px] inline pr-0.5"/>
            <Link className="pl-2" href={utility.link}>{utility.linkName}</Link>
        </li>
    )
});
const ExploreList = footerData.exploreList.map((explore) => {
    return (
        <li className="font-inter text-banner-secondary-font-color text-sm font-normal py-1">
            <FaRegCircle className="text-quaternary-color text-[5px] inline pr-0.5"/>
            <FaRegCircle className="text-quaternary-color text-[5px] inline pr-0.5"/>
            <FaRegCircle className="text-quaternary-color text-[5px] inline pr-0.5"/>
            <Link className="pl-2" href={explore.link}>{explore.linkName}</Link>
        </li>
    )
});
const ContactDetails = footerData.contactDetails.map((details) => {
    return (
        <p><span className="contact_via font-cardo text-white font-bold text-sm">{details.contact}</span><span className="contact_address font-inter text-banner-secondary-font-color text-sm font-normal">{details.address}</span></p>
    )
})

export default function Footer() {
    return (
        <footer className="bg-primary-color">
            <div className="footer_container flex flex-wrap mx-12 py-8 xl:mx-20 xl:py-11 gap-8 xl:justify-around border-b border-white border-solid">
                <div>
                    <div className="store_identity flex">
                        <Image className="logo w-5" src="/images/logo.png" alt="logo" width={100} height={100}/>
                        <h3 className="store_name font-inter text-white font-bold text-m pl-2">Pages</h3>
                    </div>
                    <div className="icon pt-7">
                        {SocialMedia}
                    </div>
                </div>
                <div className="footer_links flex flex-wrap gap-4 lg:gap-16">
                    <div className="explore">
                        <p className="link_category font-cardo text-white font-bold text-m">Explore</p>
                        <ul className="exploreList pt-5">
                            {ExploreList}
                        </ul>
                    </div>
                    <div className="utility">
                        <p className="link_category font-cardo text-white font-bold text-m">Utility Pages</p>
                        <ul className="utilityList pt-5">
                            {UtilityPages}
                        </ul>
                    </div>
                    <div className="contact">
                        <p className="link_category font-cardo text-white font-bold text-m">Keep In Touch</p>
                        <address className="contact_details pt-5">
                            {ContactDetails}
                        </address>
                    </div>
                </div>
            </div>
            <div className="copyright text-center">
                <p className="font-inter font-normal text-banner-secondary-font-color text-xs py-3"><i className="fa fa-regular fa-copyright fa-sm pr-2"></i>Drafted by <span className="text-white">Victorflow</span> - Powered by <span className="text-white">Webflow</span></p>
            </div>
        </footer>
    )
}