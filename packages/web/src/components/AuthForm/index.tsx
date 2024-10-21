'use client';

import { useState } from 'react';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(false);

    const [nickname, setNickname] = useState('');
    const [emailOrNickname, setEmailOrNickname] = useState('');
    const [password, setPassword] = useState('');

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setNickname('');
        setEmailOrNickname('');
        setPassword('');
    };

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isLogin) {
            console.log('Logging in with:', { emailOrNickname, password });
        } else {
            console.log('Registering with:', { nickname, emailOrNickname, password });
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
                    <input
                        type="text"
                        placeholder="Нікнейм"
                        className="p-5 border-blue-600 border-2 rounded-md mb-4"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                )}
                <input
                    type="text"
                    placeholder={`Електронна пошта${isLogin ? ' або нікнейм' : ''}`}
                    className="p-5 border-blue-600 border-2 rounded-md mb-4"
                    value={emailOrNickname}
                    onChange={(e) => setEmailOrNickname(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    className="p-5 border-blue-600 border-2 rounded-md mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 rounded-md p-5 text-white mt-2"
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
