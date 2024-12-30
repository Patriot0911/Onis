'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import EmailOrNicknameInput from './Partial/EmailOrNicknameInput';
import { logIn } from '@/redux/features/me/meSlice';
import NicknameInput from './Partial/NicknameInput';
import PasswordInput from './Partial/PasswordInput';
import AuthClientService from '@/services/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const AuthForm = () => {
    const { push } = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isDisabled, setIsDisabled] = useState(true);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isLogin = searchParams.get('login') == 'true';

    useEffect(() => {
        setIsDisabled(
            (!isLogin && username.trim() === '') ||
                email.trim() === '' ||
                password.trim() === '',
        );
        setHasSubmitted(false);
    }, [isLogin, username, email, password]);

    const toggleForm = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('login', `${!isLogin}`);
        push(pathname + '?' + params);
        setUsername('');
        setEmail('');
        setPassword('');
    };

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (isDisabled) {
            return;
        }
        try {
            const response = isLogin
                ? await AuthClientService.login(email, password)
                : await AuthClientService.registerUser(
                    username,
                    email,
                    password,
                );
            if (!response) return;
            const { username: uName, avatar } = response;
            dispatch(logIn({ avatar, username: uName }));
        } catch (error: unknown) {
            console.log((error as Error).message);
            // error to Toaster
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
                    <div className="flex flex-col">
                        <NicknameInput
                            value={username}
                            onChange={setUsername}
                            isLogin={isLogin}
                            hasSubmitted={hasSubmitted}
                        />
                    </div>
                )}
                <div className="flex flex-col">
                    <EmailOrNicknameInput
                        value={email}
                        onChange={setEmail}
                        isLogin={isLogin}
                        hasSubmitted={hasSubmitted}
                    />
                </div>
                <div className="flex flex-col">
                    <PasswordInput
                        value={password}
                        onChange={setPassword}
                        hasSubmitted={hasSubmitted}
                    />
                </div>
                <button
                    data-testid="auth-form-submit-button"
                    onClick={handleSubmit}
                    className="bg-blue-600 rounded-md p-5 text-white mt-2 disabled:bg-gray-400"
                    disabled={isDisabled}>
                    {isLogin ? 'Увійти' : 'Зареєструватися'}
                </button>
                <p className="text-center mt-16">
                    {isLogin ? 'Ще не маєте акаунту?' : 'Уже маєте акаунт?'}
                    <span
                        className="text-blue-600 ml-2 cursor-pointer"
                        onClick={toggleForm}>
                        {isLogin ? 'Зареєструватись' : 'Увійти'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
