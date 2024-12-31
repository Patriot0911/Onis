interface TextInputProps {
    label: string;
    name: string;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({
    label,
    name,
    value,
    placeholder,
    onChange,
}: TextInputProps) => {
    return (
        <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <input
                type="text"
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
        </label>
    );
};

export default TextInput;
