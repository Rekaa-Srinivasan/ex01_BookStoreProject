export default function Button({style, buttonName, onClick}: {style: string, buttonName: string, onClick: any | undefined}) {

    return (
        <>
        <button onClick={onClick} className={style}>{buttonName}</button>
        </>
    )
}