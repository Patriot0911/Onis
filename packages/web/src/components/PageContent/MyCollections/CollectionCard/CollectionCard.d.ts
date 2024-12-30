import { PropsWithChildren } from "react";

export declare namespace ICollectionCard {
    interface ICardWrapperProps extends PropsWithChildren {
        handle: () => void;
        label: string;
    };
    interface ICollectionCardProps {
        id: string;
        name: string;
        description: string;
    };
};
