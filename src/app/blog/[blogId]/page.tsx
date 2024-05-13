"use client";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Banner from "@/components/banner";
import { retrieveBlogs } from "@/ts/fetchData";

export default function Blog({ params }: { params: { blogId: number } }) {

    if(typeof localStorage !== 'undefined') {
        if(localStorage.getItem('user') === null) {
            redirect('/');
        }
    }

    const [blogInfo, setBlogInfo] = useState<any[]>([]);
    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await retrieveBlogs(params.blogId);
            if (response && response.documents) {
                setBlogInfo(response.documents);
            } else {
                console.error("Missing documents");
            }
        }
        fetchBlogs();
     }, []);
    return (
        <>
            <Banner title={`Significant reading has more info number`} description={`There are many variations of passages of Lorem Ipsum available, have suffered alteration in some form.`} />
            {
                blogInfo.map((blog) => {
                    const { blogImageUrl, blogDescription, 
                        blogDate, primaryContentTitle, primaryContentDescription, 
                        primaryPoints, blogLogo, blogQuote, secondaryContentTitle, 
                        secondaryContentDescription, secondaryPoints} = blog;

                        const primaryPts = JSON.parse(primaryPoints);
                        const secondaryPts = JSON.parse(secondaryPoints);
                        return (
                            <section className="single_blog_container flex flex-col sm:px-12 sm:py-8 lg:px-48 lg:py-11">
                                <article className="blog_main_content flex flex-col">
                                    <Image className="blog_picture w-[1299px]" src={blogImageUrl} alt="A girl reading a book" width={100} height={100}/>
                                    <div className="blog_info">
                                        <h3 className="blog_date font-cardo font-bold text-primary-color text-l text-left pt-[2%]">{`${blogDate} / Classics`}</h3>
                                        <p className="blog_description font-inter font-normal text-secondary-font-color text-left text-m leading-7">{blogDescription+blogDescription+blogDescription+blogDescription}</p>
                                    </div>
                                </article>
                                <section className="blog_sub_content">
                                    <h2 className="blog_sub_content_title font-cardo text-primary-color font-bold text-left text-xl pt-[2%]">{primaryContentTitle}</h2>
                                    <p className="blog_sub_content_description font-inter font-normal text-secondary-font-color text-left text-m leading-7">{primaryContentDescription}</p>
                                    <ul className="blog_sub_content_points py-[2%] px-[5%] list-disc">
                                        {
                                            primaryPts.map((point: string) => {
                                                return (<li className="point m-0 pb-[0.5%] font-inter text-primary-color text-left text-m leading-7 font-normal marker:text-quaternary-color marker:text-m" id="sub_content_point_1">{point}</li>)
                                            })
                                        }
                                    </ul>
                                </section>
                                <div className="blog_quotes relative mt-[4%] mb-[2%] bg-primary-color">
                                    <Image className="blog_logo absolute w-[5%] left-[2%]" src={blogLogo} alt="bookmark icon" width={100} height={100}/>
                                    <p className="quote font-inter font-medium text-white py-[4%] text-sm text-center">{blogQuote}</p>
                                </div>
                                <section className="blog_sub_content">
                                    <h2 className="blog_sub_content_title font-cardo text-primary-color font-bold text-left text-xl pt-[2%]">{secondaryContentTitle}</h2>
                                    <p className="blog_sub_content_description font-inter font-normal text-secondary-font-color text-left text-m leading-7">{secondaryContentDescription}</p>
                                    <ol className="blog_sub_content_points py-[2%] px-[5%] list-decimal">
                                        {
                                            secondaryPts.map((point: string) => {
                                                return (<li className="point m-0 pb-[0.5%] font-inter text-primary-color text-left text-m font-normal marker:text-quaternary-color marker:text-m" id="sub_content_point_1">{point}</li>)
                                            })
                                        }
                                    </ol>
                                </section>
                            </section>
                        )
                })
            }
            
        </>
    )
}