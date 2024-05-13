import { useEffect } from "react";
import { useState } from "react";
import { FaCircle } from "react-icons/fa";
import Image from "next/image";
import AddToCartButton from '@/components/AddToCartButton';
import { retrieveBooks } from "@/ts/fetchData";

interface BooksProps {
    authorName: string | null;
}
export default function BookContainer(author: BooksProps) {
    const [books, setBooks] = useState<any[]>();
    useEffect(() => {
        const fetchBooks = async () => {
            const response = author.authorName === 'All books' ? await retrieveBooks(-1) : await retrieveBooks(author.authorName);
            if (response && response.documents) {
                setBooks(response.documents);
            } else {
                console.error("Missing documents");
            }
        } 
        fetchBooks();
    },[author]);
    console.log(books);

    return (
        <>
            <section className="books_list flex flex-row flex-wrap items-center justify-around gap-5">
            {
                books?.map((book) => {
                    return (
                        <article className="book pb-4 flex flex-col items-center justify-center">
                            <div className="book_container p-book-container bg-secondary-bg-color w-64 flex items-baseline justify-center pb-4 px-4">
                                <a className="read_more" href={`/store/${book.bookId}`}>
                                    <p className="book-id hidden">{book.bookId}</p>
                                    <Image className="book_image max-w-52" src={book.imageUrl} alt={book.title} width={200} height={100}></Image>
                                </a>
                            </div>
                            <div className="book_info text-left py-4 px-3 w-64 h-72 grid grid-flow-row auto-rows-[0.1fr_0.6fr_0.2fr_0.2fr]">
                                <div className="flex justify-between">
                                    <h3 className="book_title font-cardo inline-block font-bold text-base text-primary-color leading-7">{book.title}</h3>
                                    <p className="book_price font-inter inline-block font-bold text-quaternary-color leading-7">{`$${book.price}.00`}</p>
                                </div>
                                <p className="book_description text-left font-inter font-normal text-sm text-secondary-font-color leading-7">{book.description}</p>
                                <div><FaCircle className="inline text-[20px] pr-2 text-quaternary-color"/><p className="book_type text-left font-inter inline-block font-bold text-sm text-primary-color py-3">Printed Books</p></div>
                                <AddToCartButton style={`book_order_button font-cardo block font-bold text-m text-primary-color border-quaternary-color border-solid border-2 px-8 py-2`} buttonName={`Order Today`} onClick={undefined}/>
                            </div>
                        </article>
                    )
                })
            }
            </section>
        </>
    )
}