"use client";
import { useState } from "react";
import { redirect } from "next/navigation";
import Banner from "@/components/banner";
import BookContainer from "./bookContainer";

export default function Store() {

    if (typeof localStorage !== 'undefined') {
        if(!localStorage.getItem('user')) {
            redirect('/');
        }
    }
    

    const authorsList = [
        { firstName: 'All', lastName: 'books', },
        { firstName: 'Chetan', lastName: 'Bhagat', },
        { firstName: 'Fredrik', lastName: 'Backman', },
        { firstName: 'Ravinder', lastName: 'Singh', },
        { firstName: 'Jojo', lastName: 'Moyes', },
        { firstName: 'Gillian', lastName: 'Flynn', },
        { firstName: 'Markus', lastName: 'Zusak', },
    ];
    const [author, setAuthor] = useState<string>("All books");
    function handleBooks(selectedAuthor: string) {
        setAuthor(selectedAuthor);
    }
    return (
        <>
        <Banner title={`My Store`} description={`There are many variations of passages of Lorem Ipsum available, have suffered alteration in some form.`} />
        <main className="px-4 py-4 lg:p-main-container bg-white">
            <div className="choose_author pb-8">
                <select onChange={(e) => {handleBooks(e.target.value)}} className="authors border-2 border-quaternary-color p-2 border-solid font-cardo text-primary-color font-bold">
                    {
                        authorsList.map((author) => {
                            return (
                                <option className="author font-cardo text-primary-color font-bold" value={`${author.firstName} ${author.lastName}`}>{`${author.firstName} ${author.lastName}`}</option>
                            );
                        })
                    }
                </select>
            </div>
            <BookContainer authorName={author} />
        </main>
        </>
    )
}