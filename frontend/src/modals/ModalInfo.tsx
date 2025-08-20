import { ParcaIscilikFormData } from "@/types/MyZodForm.d";
import { FieldErrors, UseFormRegister, SubmitHandler } from "react-hook-form";

interface IProps {
    setIsModalOpen: (isModalOpen: boolean) => void;
    title: string;
    content: string;
}

export default function ModalInfo(props: IProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">{props.title}</h2>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-gray-500">{props.content}</p>
                    </div>
                    <div className="flex justify-end space-x-4 pt-4 border-t">
                            <button
                                type="button"
                                onClick={() => props.setIsModalOpen(false)}
                                className="px-6 py-2 border border-red-300 rounded-md text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Kapat
                            </button>
                        </div>
                </div>
            </div>
        </div>
    );
}