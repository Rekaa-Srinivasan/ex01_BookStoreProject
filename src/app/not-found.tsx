import Image from "next/image";
import Link from "next/link";
import Banner from "@/components/banner";

export default function NotFound() {
    return (
        <>
        <Banner title={`Page Error`} description={`The page you are looking for doesn't exist. Please try searching for some other page, or return to the website's homepage.`}  />
        <main className="bg-[url('/images/background.png')] bg-cover bg-no-repeat bg-center w-full">
            <div className="py-36 px-8 text-center">
                <Image className="mx-auto" src={'/images/not-found.png'} alt={'404 Error'} width={350} height={100} />
                <h1 className="text-center font-cardo font-extrabold text-primary-color text-xxl mt-6">Page not Found!!!</h1>
                <p className="font-inter text-center text-banner-secondary-font-color text-sm font-normal leading-7 px-7 lg:px-80 py-4">The page you are looking for doesn't exist. Please try searching for some other page, or return to the website's homepage to find what you're looking for.</p>
                <Link className="font-cardo font-bold text-m text-primary-color border-quaternary-color border-solid border-2 px-8 py-2" href={'/'}>Back to Home</Link>
            </div>
        </main>
        </>
    )
}