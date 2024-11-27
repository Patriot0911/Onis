interface DescriptionInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const DescriptionInput = ({ value, onChange }: DescriptionInputProps) => (
    <label className="flex flex-col">
        <span className="text-sm font-medium text-gray-700">Description</span>
        <textarea
            name="description"
            value={value}
            onChange={onChange}
            placeholder="Enter project description"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            rows={2}
        />
    </label>
);

export default DescriptionInput;