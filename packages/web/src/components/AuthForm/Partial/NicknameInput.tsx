import { useEffect, useState } from 'react';

interface NicknameInputProps {
    value: string;
    onChange: (value: string) => void;
    isLogin: boolean;
    hasSubmitted: boolean;
}

const NicknameInput = ({ value, onChange, isLogin, hasSubmitted }: NicknameInputProps) => {
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isLogin && value.trim() === '') {
            setError('Нікнейм не може бути порожнім');
        } else {
            setError('');
        }
    }, [value, isLogin]);

    return (
        <>
            <input
                type="text"
                placeholder="Нікнейм"
                className="p-5 border-blue-600 border-2 rounded-md"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {error && hasSubmitted && <p className="text-red-500 mt-2">{error}</p>}
        </>
    );
};

export default NicknameInput;
