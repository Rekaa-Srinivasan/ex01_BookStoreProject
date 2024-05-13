"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Banner from "@/components/banner";
import { retrieveBlogs } from "../../ts/fetchData";

export default function Blogs() {
    if(typeof localStorage !== 'undefined') {
        if(localStorage.getItem('user') === null) {
            redirect('/');
        }
    }

    const [blogs, setBlogs] = useState<any[]>([]);
    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await retrieveBlogs(-1);
            if (response && response.documents) {
                setBlogs(response.documents);
            } else {
                console.error("Missing documents");
            }
        }
        fetchBlogs();
     },[]);
    return (
        <>
            <Banner title={`Articles`} description={`There are many variations of passages of Lorem Ipsum available, have suffered alteration in some form.`} />
            <main className="main_container bg-secondary-bg-color">
                <section className="blogArticles pt-[8%] flex flex-wrap gap-[5%] items-center justify-center">
                    {
                        blogs.map((blog) => {
                            const { blogImageUrl, blogTitle, blogDescription, blogAuthor, 
                                blogDate, blogId } = blog;
                            return (
                                <article className="blogs pb-[2%] flex flex-wrap flex-col">
                                    <Image className="article_picture w-[300px]" src={blogImageUrl} alt="Blog Image" width={100} height={100}/>
                                    <div className="blogInfo w-[300px] bg-white p-[23px]">
                                        <h3 className="subTitle mt-0 font-cardo text-m mb-[5px] text-primary-color text-left">{blogTitle}</h3>
                                        <p className="blogDescription font-inter text-secondary-font-color text-sm mb-3 text-left">{blogDescription}</p>
                                        <p className="blogLink font-cardo text-primary-color mb-0 text-sm text-left font-semibold"><a className="blog_direct_link font-cardo pr-[53px] text-primary-color underline underline-offset-auto" href={`/blog/${blogId}`}>Read More</a>{`${blogAuthor} - ${blogDate}`}</p>
                                    </div>
                                </article>
                            )
                        })
                    }
                </section>
            </main>
        </>
    )
}