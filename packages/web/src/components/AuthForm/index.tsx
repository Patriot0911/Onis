'use client';

import { registerUser } from '@/services/auth';
import { useEffect, useState } from 'react';
import EmailOrNicknameInput from './Partial/EmailOrNicknameInput';
import NicknameInput from './Partial/NicknameInput';
import PasswordInput from './Partial/PasswordInput';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const [nickname, setNickname] = useState('');
    const [emailOrNickname, setEmailOrNickname] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setIsDisabled(
            (!isLogin && nickname.trim() === '')
            || emailOrNickname.trim() === ''
            || password.trim() === ''
        ); 
        setHasSubmitted(false);
    }, [isLogin, nickname, emailOrNickname, password]);

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setNickname('');
        setEmailOrNickname('');
        setPassword('');
    };

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (isDisabled) {
            return;
        }

        try {
            if (isLogin) {
                console.log('Logging in with:', { emailOrNickname, password });
            } else {
                console.log('Registering with:', { nickname, emailOrNickname, password });
                const response = await registerUser(nickname, emailOrNickname, password);
                console.log('Registered:', response);
            }
        } catch (error) {
            console.error('Failed to register:', error);
        }
    };

    return (
        <div className="bg-white rounded-xl px-8 py-16 shadow-md w-fit">
            <h1 className="text-3xl text-center mb-4">
                {isLogin ? 'Раді бачити вас знову в ' : 'Ласкаво просимо до '}
                <span className="text-blue-600">Onis</span>
            </h1>
            <div className="flex flex-col pt-4 w-[500px]">
                {!isLogin && (
                    <div className='flex flex-col mb-4'>
                        <NicknameInput
                            value={nickname}
                            onChange={setNickname}
                            isLogin={isLogin}
                            hasSubmitted={hasSubmitted}
                        />
                    </div>
                )}
                <div className='flex flex-col mb-4'>
                    <EmailOrNicknameInput
                        value={emailOrNickname}
                        onChange={setEmailOrNickname}
                        isLogin={isLogin}
                        hasSubmitted={hasSubmitted}
                    />
                </div>
                <div className='flex flex-col mb-4'>
                    <PasswordInput
                        value={password}
                        onChange={setPassword}
                        hasSubmitted={hasSubmitted}
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 rounded-md p-5 text-white mt-2 disabled:bg-gray-400"
                    disabled={isDisabled}
                >
                    {isLogin ? 'Увійти' : 'Зареєструватися'}
                </button>
                <p className="text-center mt-16">
                    {isLogin ? 'Ще не маєте акаунту?' : 'Уже маєте акаунт?'}
                    <span
                        className="text-blue-600 ml-2 cursor-pointer"
                        onClick={toggleForm}
                    >
                        {isLogin ? 'Зареєструватись' : 'Увійти'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
