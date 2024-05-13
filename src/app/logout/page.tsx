import Link from "next/link";
import Banner from "@/components/banner";
import { account } from "@/ts/appwrite";

const logout = async () => {
    const logoutUser = await account.deleteSessions().catch(
        (error: any) => {
            console.log(error.message);
        }
    );
    console.log(logoutUser);
    if(logoutUser) {
        localStorage.removeItem('user');
        // localStorage.removeItem('cart');
    }
}
export default function Logout() {
    logout();
    return (
        <>
            <Banner title={`Visit Again`} description={`There are many variations of passages of Lorem Ipsum available, have suffered alteration in some form.`} />
            <main className="bg-[url('/images/background.png')] bg-cover bg-no-repeat bg-center w-full">
                <div className="py-72 px-8 text-center">
                    <h1 className="text-center font-cardo font-extrabold text-primary-color text-xxl">Visit Again</h1>
                    <p className="font-inter text-center text-banner-secondary-font-color text-sm font-normal leading-7 pb-14">Thanks for visiting our page. Happy Reading!</p>
                    <Link className="font-cardo font-bold text-m text-primary-color border-quaternary-color border-solid border-2 px-8 py-2" href={'/'}>Back to Home</Link>
                </div>
            </main>
        </>
    )
}
export { logout };