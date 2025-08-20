import Link from "next/link";
import { FiPlus } from "react-icons/fi";

interface IProps {
    title: string;
    subTitle: string;
    href: string;
    buttonText: string;
}

export default function ButtonEkle(props: IProps) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{props.title}</h1>
                    <p className="text-gray-600">{props.subTitle}</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <Link
                        href={props.href}
                        className="border border-blue-300 rounded-md text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-md font-medium transition duration-200 flex items-center"
                    >
                        {props.buttonText}
                        <FiPlus className="ml-1" />
                    </Link>
                </div>
            
        </div>
    );
}