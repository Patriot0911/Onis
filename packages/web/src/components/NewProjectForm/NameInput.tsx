interface NameInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const NameInput = ({ value, onChange }: NameInputProps) => (
    <label className="flex flex-col">
        <span className="text-sm font-medium text-gray-700">Title</span>
        <input
            type="text"
            name="title"
            value={value}
            onChange={onChange}
            placeholder="Enter project name"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
    </label>
);

export default NameInput;