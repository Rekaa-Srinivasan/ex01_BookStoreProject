'use client';
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";

const PopUp = ({category, message}: {category: string, message: string}) => {
    const router = useRouter();
    
    const close = () => {
        console.log('CLICKED');
        router.back();
    }
    console.log('POPUP COMPONNET is triggered');
    return (
        <main className={`flex  flex-col fixed inset-0 bg-primary-color bg-opacity-30 overflow-y-auto h-full`}>
            <div className="flex justify-between bg-quaternary-color w-1/4 mt-48 ml-[29.5rem] py-2 px-2">
                <h3 className="font-cardo text-center font-bold text-primary-color">{category}</h3>
                <RxCross2 onClick={() => close()}  className="text-primary-color text-right" size={22}/>
            </div>
            <div className="font-cardo text-center font-bold text-primary-color bg-white py-10 px-8 w-1/4 ml-[29.5rem]">{message}</div>
         </main>
    )
    
}

export default PopUp;