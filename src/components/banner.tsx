interface BannerPropsType {
    title: string,
    description: string,
}

export default function Banner({title, description}: BannerPropsType) {
    return (
        <section className="bg-primary-color pt-14">
            <h1 className="font-cardo text-center text-tertiary-bg-color text-xxl font-bold pb-4 underline decoration-quaternary-color decoration-solid underline-offset-8">{title}</h1>
            <p className="font-inter text-center text-banner-secondary-font-color text-sm font-normal leading-7 md:px-40 lg:px-60 xl:px-banner-paragraph pb-14">{description}</p>
        </section>
    )
}