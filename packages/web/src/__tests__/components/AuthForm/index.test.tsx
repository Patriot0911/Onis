import { render, screen } from '@testing-library/react';
import AuthForm from '@/components/AuthForm';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
    usePathname: jest.fn(),
    useSearchParams: jest.fn().mockReturnValue({
        get: jest.fn().mockReturnValue('true'),
    }),
}));

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));

describe('Auth form Tests', () => {
    it('the submit button must be present', () => {
        render(<AuthForm />);

        const sumbitButton = screen.getByTestId('auth-form-submit-button');

        expect(sumbitButton).toBeInTheDocument();
    });
});
