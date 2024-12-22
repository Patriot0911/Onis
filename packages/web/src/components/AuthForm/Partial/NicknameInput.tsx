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
                name={'username'}
                onChange={(e) => onChange(e.target.value)}
            />
            <div className='h-6 my-2'>
                {error && hasSubmitted && <p className="text-red-500">{error}</p>}
            </div>
        </>
    );
};

export default NicknameInput;
