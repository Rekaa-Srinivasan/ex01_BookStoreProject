"use client";
import { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import { redirect } from "next/navigation";
import Image from "next/image";
import AddToCartButton from '@/components/AddToCartButton';
import Banner from "@/components/banner";
import { retrieveAuthor } from "@/ts/fetchData"; 
import Link from "next/link";

export default function Author({ params }: { params: { authorId: string } }) {

    if(typeof localStorage !== 'undefined') {
        if(localStorage.getItem('user') === null) {
            redirect('/');
        }
    }

    const [author, setAuthor] = useState<any[]>([]);
    useEffect(() => {
        const fetchAuthor = async () => {
            const response = await retrieveAuthor(params.authorId);
            if(response && response.documents) {
                setAuthor(response.documents);
            }else{
                console.error("Missing documents");
            }
        }
        fetchAuthor();
    }, []);
    console.log(author);
    return (
        <>
            <Banner title={`About the Author`} description={`There are many variations of passages of Lorem Ipsum available, have suffered alteration in some form.`} />
            {
                author.map((author) => {
                    const { authorImageUrl, authorName, aboutAuthor, authorStory, authorAwards,
                        bookID, authorProfile, sponsors, biography } = author;
                        const bio = JSON.parse(biography);
                        const awards = JSON.parse(authorAwards);
                        const sponsorship = JSON.parse(sponsors);
                    return (
                        <main>
                            <article className="author_information sm:px-12 sm:py-8 lg:px-48 lg:py-11 flex flex-col flex-wrap bg-secondary-bg-color">
                                <Image className="w-full p-0" alt="Author's Image" src={authorImageUrl} width={500} height={300} ></Image>
                                <div className="author_info flex flex-wrap py-10 px-4">
                                    <div className="author_biography bg-white border-2 border-solid border-[#DFE9F8] basis-5/12 flex-auto px-4 pt-4">
                                        <table>
                                            <tbody>
                                                {
                                                    bio.map((authorBiography: {category: string, value: string}) => {
                                                        const {category, value} = authorBiography;
                                                        return (
                                                            <tr>
                                                                <td className="font-cardo text-left text-primary-color text-[15px] font-bold leading-10">{category}</td>
                                                                <td className="author_details font-inter text-secondary-font-color text-[13px] font-normal leading-10 pl-11">{value}</td>
                                                            </tr>
                                                        );
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="author_additional_info pl-10 pr-6 text-left basis-2/4 flex-auto ">
                                        <h1 className="author_name font-cardo text-primary-color text-[25px] font-bold text-left underline decoration-quaternary-color decoration-solid underline-offset-8">{`About ${authorName}`}</h1>
                                        <p className="about_author text-left font-inter text-secondary-font-color text-[13px] font-normal pt-4 leading-7">{aboutAuthor}</p>
                                        <Link href={`https://www.instagram.com/${authorName.toLowerCase().replace(/ /g,'')}/`}><AddToCartButton buttonName="Contact now" style="contact_author font-cardo text-primary-color text[15px] font-bold bg-quaternary-color py-2 px-11 border-none mt-4" onClick={undefined}/></Link>
                                    </div>
                                </div>
                            </article>
                            <article className="author_and_his_story flex flex-col-reverse lg:flex-row items-center justify-center bg-white sm:px-12 sm:py-8 lg:px-48 lg:py-11">
                                <div className="author_story flex-grow flex-shrink-0 basis-2/4 text-left sm:px-6 lg:px-0 px-6">
                                    <h3 className="author_story_title text-left font-cardo font-bold text-primary-color text-[32px] mb-5 pb-[15px] underline decoration-quaternary-color decoration-solid underline-offset-8">My Story</h3>
                                    <p className="author_story_description font-inter text-secondary-font-color text-left text-[13px] leading-6">{authorStory}</p>
                                    <div className="authors_awards flex flex-col m-5">
                                        {
                                            awards.map((award: { awardNumber: any; awardTitle: any; awardDescription: any; }) => {
                                                const { awardNumber, awardTitle, awardDescription } = award;
                                                return (
                                                    <div className="awards flex flex-row mb-3">
                                                        <div className="award border border-solid border-quaternary-color p-[10px] font-cardo font-bold bg-quaternary-color h-fit">{awardNumber}</div>
                                                        <div className="awards_info pl-3">
                                                            <h3 className="award_name text-[15px] font-cardo font-bold text-left text-primary-color mb-3">{awardTitle}</h3>
                                                            <p className="award_description font-inter font-normal text-left text-secondary-font-color text-[13px] leading-6">{awardDescription}</p>
                                                        </div>
                                                    </div>
                                                );
                                            }) 
                                        }
                                    </div>
                                </div>
                                <Image className="author_profile w-full" src={authorProfile} alt="Author's Profile" width={500} height={300}></Image>
                            </article>
                            <section className="author_books sm:py-8 lg:px-48 lg:py-11 flex flex-col flex-wrap bg-secondary-bg-color">
                                <h3 className="author_books_section_title text-center font-cardo font-bold text-primary-color text-[32px] underline decoration-quaternary-color decoration-solid underline-offset-8">Author’s Book Includes</h3>
                                <section className="books flex flex-col justify-end lg:flex-row pt-12">
                                    {
                                        bookID.map((book: {bookId: string; imageUrl: string; title: string; description: string; paperback: string; timeTakenToFinish: string;}) => {
                                            const {bookId, imageUrl, title, description, paperback, timeTakenToFinish} = book;
                                            return (
                                                <article className="book_conatiner flex flex-col md:flex-row lg:flex-col xl:flex-row flex-grow flex-shrink-0 basis-2/4 mt-[5%] lg:mt-0 items-center px-6 lg:p-0">
                                                    <a href={`/store/${bookId}`} className="basis-2/5"><Image className="book_cover w-full sm:w-[200px] mx-auto" src={imageUrl} alt={`${title} book`} width={100} height={100}></Image></a>
                                                    <div className="book_info basis-3/5 p-3 text-left">
                                                        <h4 className="book_title text-primary-color font-cardo font-bold text-[19px] text-left">{title}</h4>
                                                        <p className="book_description text-secondary-font-color font-inter font-normal text-[13px] text-left">{description}</p>
                                                        <div className="book_page_details flex gap-3 flex-wrap">
                                                            <div>
                                                                <p className="about_book text-[16px] font-bold inline-block mt-5 font-cardo text-primary-color"><FaCircle className="text-quaternary-color inline w-3 mr-2"/>Pages</p>
                                                                <p className="about_book_value text-[13px] font-medium font-inter text-secondary-font-color pl-3">{`${paperback} Pages`}</p>
                                                            </div>
                                                            <div>
                                                                <p className="about_book text-[16px] font-bold inline-block mt-5 font-cardo text-primary-color"><FaCircle className="text-quaternary-color inline w-3 mr-2"/>Length</p>
                                                                <p className="about_book_value text-[13px] font-medium font-inter text-secondary-font-color pl-3">{`${timeTakenToFinish} Hours`}</p>
                                                            </div>
                                                        </div>
                                                        <AddToCartButton style="book_order_button font-cardo text-primary-color font-bold border border-solid border-quaternary-color bg-white py-2 px-9 mt-5" buttonName={`Order Today`} onClick={undefined}/>
                                                    </div>
                                                </article>
                                            )
                                        })
                                    }
                                </section>
                            </section>
                            <section className="author_sponsors sm:py-8 lg:px-48 lg:py-11 bg-white">
                                <h3 className="author_sponsor_title text-center font-cardo font-bold text-primary-color  text-[32px] underline decoration-quaternary-color decoration-solid underline-offset-8">Trusted by the Best</h3>
                                <div className="sponsors_list flex flex-row flex-wrap">
                                    {
                                        sponsorship.map((sponsor: {sponsorLogo: string; sponsorName: string; sponsorDescription: string;}) => {
                                            const { sponsorLogo, sponsorName, sponsorDescription } = sponsor;
                                            return (
                                                <article className="sponsor flex flex-col flex-wrap justify-center items-center flex-grow flex-shrink-0 basis-[10%] p-6">
                                                    <Image className="sponsor_logo w-3/5" src={sponsorLogo} alt="Amazen Corps Logo" width={100} height={100}/>
                                                    <h4 className="sponsor_name text-m font-cardo text-primary-color font-bold my-[5%]">{sponsorName}</h4>
                                                    <p className="sponsor_description font-inter text-sm font-normal text-secondary-font-color px-[2%]">{sponsorDescription}</p>
                                                </article>
                                            )
                                        })
                                    }
                                </div>
                                <section className="subscribe bg-quaternary-color">
                                    <article className="read_first_chapter py-[8%]">
                                        <h3 className="subscribe_title text-center font-cardo font-bold text-primary-color text-2xl underline decoration-primary-color decoration-solid underline-offset-8">Read a free chapter</h3>
                                        <p className="subscribe_description text-center font-inter font-normal text-primary-color text-sm my-[3%] mx-[15%] md:mx-[29%] lg:mx-[32%]">Sign Up and do give it a read to a book of your favorite author.</p>
                                        <div className="flex justify-center ">
                                        <input className="subscribe_email font-inter font-normal text-secondary-font-color bg-white text-sm border-none py-[1.5%] px-[2%] md:pr-[18%] md:pl-[2%] focus:border-none" type="email" placeholder="Your Email id..."/>
                                        <AddToCartButton style="subscribe_button text-center font-cardo font-bold text-white bg-primary-color border-none text-sm px-[6%] py-[1.4%]" buttonName="Subscribe" onClick={undefined}/>
                                        </div>
                                    </article>
                                </section>
                            </section>
                        </main>
                    );
                })
            }
        </>
    )
}