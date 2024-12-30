import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface PasswordInputProps {
    value: string;
    onChange: (value: string) => void;
    hasSubmitted: boolean;
}

const PasswordInput = ({
    value,
    onChange,
    hasSubmitted,
}: PasswordInputProps) => {
    const [error, setError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        if (value.trim() === '') {
            setError('Пароль не може бути порожнім');
        } else if (value.length < 6) {
            setError('Пароль має містити щонайменше 6 символів');
        } else {
            setError('');
        }
    }, [value]);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };

    return (
        <>
            <div className="relative w-full flex items-center">
                <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Пароль"
                    className="p-5 pr-12 border-blue-600 border-2 rounded-md w-full"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {!isPasswordVisible ? (
                        <FaEyeSlash
                            className="h-6 w-6 text-blue-600 cursor-pointer"
                            onClick={togglePasswordVisibility}
                        />
                    ) : (
                        <FaEye
                            className="h-6 w-6 text-blue-600 cursor-pointer"
                            onClick={togglePasswordVisibility}
                        />
                    )}
                </div>
            </div>
            <div className="h-6 my-2">
                {error && hasSubmitted && (
                    <p className="text-red-500">{error}</p>
                )}
            </div>
        </>
    );
};

export default PasswordInput;
