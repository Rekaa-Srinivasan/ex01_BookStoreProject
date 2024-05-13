'use client';
import { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image"
import Link from "next/link";
import { Query } from "appwrite";
import Banner from "@/components/banner"
import PopUp from "@/components/popUp";
import { databases } from "@/ts/appwrite";
import { removeBookFromCart } from "../../ts/cart";

export default function Cart() {
    if(typeof localStorage !== 'undefined') {
        if(!localStorage.getItem('user')) {
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
    
    const userIfExist = localStorage.getItem('user');
    let user = {userId: '', email: ''};
    if(userIfExist) {
        user = JSON.parse(userIfExist);
    }
    const [userBooks, setUserBooks] = useState<any[]>([]);
    useEffect(() => {
        const fetchUserCart = async () => {
            try {
                const userCartDetails = await databases.listDocuments('6617abe7972b1276173d', '663b1ac20038f2d26e62', [Query.equal('userId', [user.userId])]);
                const { cart } = userCartDetails.documents[0];
                // localStorage.setItem('cart', JSON.stringify({cart: cart.length}));
                const fetchedBooks = Promise.all(cart.map(async(bookId: any) => {
                    const book = await databases.listDocuments('6617abe7972b1276173d', '6617ac1d17a701221af6', [Query.equal('bookId', [bookId])]);
                    book.documents[0].documentId = userCartDetails.documents[0].$id;
                    return book.documents[0];
                }));
                if(fetchedBooks !== null) {
                    setUserBooks(await fetchedBooks);
                }
            }catch{ (error: any) => console.log('ERROR FETCHING USER CART', error)}
        }
        fetchUserCart();
    }, [show]);
    console.log('userBooks',userBooks);

    const router = useRouter();
    const removeBook = (documentId: string, bookId: string) => {
        removeBookFromCart(documentId, bookId);
        setTimeout(() => {
            console.log('RELOADED');
            router.refresh();
        }, 2000);
    }

    return (
        <>
        <Banner title={`Wish List`} description={`What are you waiting for? Buy your favorite books and take a dive into another world this weekend!!!`}  />
        {userBooks.length !== 0 ? 
        <>
            <section className="books_list flex flex-row flex-wrap items-center justify-around gap-5 p-20">
            {
                userBooks?.map((book: any) => {
                    const { bookId, imageUrl, title, documentId, price } = book;
                    console.log('USER BOOKS',userBooks);
                    return (
                        <article className="book pb-4 flex flex-col items-center justify-center">
                            <div className="book_container p-book-container bg-secondary-bg-color w-64 flex items-baseline justify-center pb-4 px-4">
                                <a className="read_more" href={`/store/${bookId}`}>
                                    <p className="book-id hidden">{bookId}</p>
                                    <Image className="book_image max-w-52" src={imageUrl} alt={title} width={200} height={100}></Image>
                                </a>
                            </div>
                            <div className="flex justify-between gap-8 pt-4">
                                <h3 className="book_title font-cardo inline-block font-bold text-base text-primary-color leading-7">{title}</h3>
                                <p className="book_price font-inter inline-block font-bold text-quaternary-color leading-7">{`$${price}.00`}</p>
                                <Link  href={`/cart?show=true`}><IoTrashOutline onClick={() => removeBook(documentId, bookId)} className="text-red-600 my-auto" size={20} /></Link>
                            </div>
                        </article>
                    )
                })
            }
            </section>
            {show === 'true' ? <PopUp category='Cart' message="Book is removed from the cart!" /> : null}
        </> :
        <main className="bg-[url('/images/background.png')] bg-cover bg-no-repeat bg-center w-full">
            <div className="py-36 px-8 text-center">
                <h1 className="text-center font-cardo font-extrabold text-primary-color text-xxl">Cart is Empty!</h1>
                <p className="font-inter text-center text-banner-secondary-font-color text-sm font-normal leading-7 pb-14">Looks like your cart is empty. Visit Home and start adding your favorite books!</p>
                <Link className="font-cardo font-bold text-m text-primary-color border-quaternary-color border-solid border-2 px-8 py-2" href={'/store'}>Visit Store</Link>
            </div>
        </main>}
        </>
    )
}