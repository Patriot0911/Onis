import { ILayout } from '@/interfaces/layout';

const Main = ({ children, bgClr, }: ILayout.IMainProps) => {
    return (
        <main
            style={{
                backgroundColor: bgClr && `var(--color-bg-${bgClr})`,
            }}
        >
            {children}
        </main>
    );
};

export default Main;
