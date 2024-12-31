import { PropsWithChildren } from 'react';

export declare namespace ICollectionCard {
    interface ICardWrapperProps extends PropsWithChildren {
        id: string;
        label: string;
    }
    interface ICollectionCardProps {
        id: string;
        name: string;
        description?: string;
    }
}
