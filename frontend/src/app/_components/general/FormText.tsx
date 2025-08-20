import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface IProps {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    id: string;
    label: string;
    disabled?: boolean;
    type?: string;
    placeholder?: string;
    registerName: string;
    step?: string;
}

export default function FormText(props: IProps) {
    return (
        <div className="space-y-1">
            <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
                {props.label}
            </label>
            <input
                type={props.type}
                id={props.id}
                {...props.register(props.registerName)}
                className={`text-black w-full px-3 py-2 border rounded-md ${props.errors[props.registerName] ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                disabled={props.disabled}
                step={props.step}
            />
            {props.errors[props.registerName] && (
                <p className="text-red-500 text-xs">
                    {props.errors[props.registerName]?.message?.toString()}
                </p>
            )}
        </div>
    )
}