interface ThumbnailInputProps {
    thumbnail: File | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFileClick: () => void;
}

const truncateFileName = (filename: string | null) => {
    if (!filename) return null;
    return filename.length > 37 ? `${filename.slice(0, 34)}...` : filename;
};

const ThumbnailInput = ({
    thumbnail,
    onChange,
    onFileClick,
}: ThumbnailInputProps) => (
    <label className="flex flex-col">
        <span className="text-sm font-medium text-gray-700 mb-2">
            Thumbnail
        </span>
        <div className="flex items-center gap-4">
            <input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={onChange}
                className="hidden"
                id="file-input"
            />
            <button
                type="button"
                onClick={onFileClick}
                className="px-4 py-2 h-10 bg-primary text-white rounded shadow hover:bg-secondary">
                Upload File
            </button>
            <span className="text-sm text-gray-600">
                {thumbnail?.name
                    ? truncateFileName(thumbnail.name)
                    : 'No file selected'}
            </span>
        </div>
    </label>
);

export default ThumbnailInput;
