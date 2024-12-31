type TextAreaProps = {
    label: string;
    name: string;
    value: string;
    placeholder?: string;
    rows?: number;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea = ({
    label,
    name,
    value,
    placeholder,
    rows = 2,
    onChange,
}: TextAreaProps) => {
    return (
        <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <textarea
                name={name}
                value={value}
                placeholder={placeholder}
                rows={rows}
                onChange={onChange}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
        </label>
    );
};

export default TextArea;
