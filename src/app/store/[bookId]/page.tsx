"use client";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from '@/components/AddToCartButton';
import Banner from "@/components/banner";
import PopUp from "@/components/popUp";
import { retrieveBooks } from "@/ts/fetchData";
import addToCart from "@/ts/cart";

export default function Book({params}: {params: {bookId: number}}) {
    if (typeof localStorage !== 'undefined') {
        if(localStorage.getItem('user') === null) {
            redirect('/');
        }
    }
    function GetParameterValues(param: string) {  
        if(typeof window !== 'undefined') {
            var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');  
            for (var i = 0; i < url.length; i++) {  
                var urlparam = url[i].split('=');  
                if (urlparam[0] == param) {  
                    return urlparam[1];  
                }  
            } 
        } 
    }
    const show = GetParameterValues("show");
    console.log('SHOW',show);
    
    const [book, setBook] = useState<any[]>([]);
    useEffect(() => {
        const fetchBook = async () => {
            const response = await retrieveBooks(Number(params.bookId));
            if(response && response.documents) {
                setBook(response.documents);
            }else{
                console.error("Missing documents");
            }
        }
        fetchBook();
    }, []);
    const router = useRouter();
    return (
        <>
            <Banner title={`My Store`} description={`There are many variations of passages of Lorem Ipsum available, have suffered alteration in some form.`} />
            {
                book.map((book) => {
                    const {bookId, price, imageUrl, description, title, authorName, productDetails, availableBookCount, authorID, productAdditionalInfo, serviceInfo} = book;

                    const productInfo = JSON.parse(productDetails);
                    const productInformation = JSON.parse(productAdditionalInfo);
                    const {authorId} = authorID;
                    const serviceInformation = JSON.parse(book.serviceInfo);

                    return (
                        <main>
                            <article className="product_container bg-white sm:px-12 sm:py-8 lg:px-48 lg:py-11 flex flex-col md:flex-row flex-wrap text-center">
                                <div className="product_image_conatainer bg-secondary-bg-color flex-grow flex-shrink-0 basis-2/5 flex justify-center p-8">
                                    <Image className="product_image w-3/ 4" src={imageUrl} alt={`${title} book`} width={275} height={100} ></Image>
                                </div>
                                <div className="product_information text-left flex-grow flex-shrink basis-3/5 pl-6 md:pl-10 mt-12">
                                    <h3 className="product_title font-cardo font-bold text-xl text-primary-color mt-0 mb-1">{`${title} - ${authorName}`}</h3>
                                    <h4 className="product_price font-inter font-extrabold mt-0 text-m text-quaternary-color">{`$${price}.00 USD`}</h4>
                                    <p className="product_description font-inter font-normal text-sm leading-8 text-secondary-font-color py-4 pr-5">{description}</p>
                                    <div className="product_details font-inter font-normal text-sm leading-8 text-secondary-font-color">
                                    <table className="max-w-table">
                                        <tbody>
                                            {
                                                productInfo.map((detail: {name: string, value: string}) => {
                                                    const {name, value} = detail;
                                                    return (
                                                        <tr>
                                                            <td className="p-1">{name}</td>
                                                            <td className="p-1">:</td>
                                                            <td className=" product_detailed_info pl-5">{value}</td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    </div>
                                    <div className="add_product mt-4 flex">
                                        <div className="number_of_products basis-1/12 font-inter border-2 border-solid border-quaternary-color text-secondary-font-color inline-block px-9 py-3 m-0 mr-3 font-medium">{availableBookCount}</div>
                                        <Link className="text-center pt-[0.6rem] basis-3/5 border-2 border-solid border-quaternary-color bg-quaternary-color" href={`/store/${bookId}?show=true`}><AddToCartButton style="add_product_to_cart_button font-cardo text-primary-color inline-block font-bold m-0" buttonName={`Add to Cart`}  onClick={() => {addToCart(bookId); console.log('CAME BACK'); router.refresh();}}/></Link>
                                    </div>
                                </div>
                            </article>
                            <section className="about_product bg-white lg:px-48 md:pb-10 md:pt-0 sm:px-4 sm:py-8 flex flex-col">
                                <div className="product_information_buttons flex flex-wrap gap-4 md:gap-12 justify-center">
                                    <AddToCartButton style="product_description_button bg-primary-color text-tertiary-bg-color font-cardo font-bold border-2 border-solid border-primary-color px-7 py-3 mt-5" buttonName="PRODUCT DESCRIPTION" onClick={undefined}/>
                                    <Link href={`/author/${authorId}`}><AddToCartButton style="additional_info_button bg-secondary-bg-color text-primary-color font-cardo font-bold border-2 border-solid border-secondary-bg-color px-7 py-3 mt-5" buttonName="AUTHOR INFORMATION" onClick={undefined} /></Link>
                                </div>
                                <div className="product_additional_info flex flex-col md:flex-row flex-wrap gap-4 md:gap-12 justify-center pt-8">
                                    {
                                        productInformation.map((information: {name: string, value: string}) => {
                                            const {name, value} = information;
                                            return (
                                                <div className="discount_info basis-2/5 flex-grow px-3 md:px-0">
                                                    <h3 className="discount_info_title text-primary-color font-cardo font-bold ">{name}</h3>
                                                    <p className="discount_info_description text-secondary-font-color font-inter font-normal text-sm leading-7">{value}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </section>
                            <section className="services sm:px-1 lg:py-12 lg:px-36 flex flex-row flex-wrap items-center justify-center bg-quaternary-color gap-20">
                                {
                                    serviceInformation.map((information: {serviceLogoImage: {src: string, className: string, width: number}[], serviceName: string, serviceDescription: string}) => {
                                        const {serviceLogoImage, serviceName, serviceDescription} = information;
                                        return (
                                            <article className="product_service basis-2/5 lg:basis-1/4">
                                                <div className="service_logo_conatiner text-center relative flex justify-center py-4">
                                                    {
                                                        serviceLogoImage.map((logo:{src: string, className: string, width: number}) => {
                                                            const {src, className, width} = logo;
                                                            return (
                                                                <Image  src={src} className={`top-10 ${className}`} alt="Logo" width={width} height={100} />
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <h3 className="service_name font-cardo text-m font-bold text-center text-primary-color pb-2">{serviceName}</h3>
                                                <p className="service_description font-inter text-sm font-normal text-center text-primary-color">{serviceDescription}</p>
                                                {show === 'true' ? <PopUp category='Cart' message="Book is added to the cart!" /> : null}
                                            </article>
                                        )
                                    })
                                }
                            </section>
                        </main>
                    )
                })
            }
        </>
    )
}