import AuthForm from '@/components/AuthForm';
import { Suspense } from 'react';

const AuthPage = () => {
    return (
        <div className="flex justify-center items-center">
            <Suspense>
                <AuthForm />
            </Suspense>
        </div>
    );
};

export default AuthPage;
