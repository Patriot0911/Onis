import { IoIosArrowForward } from 'react-icons/io';
import CollectionInfoCard from './CollectionInfoCard';

type Collection = {
    answers: string[];
    status: string;
    title: string;
    lastChange: string;
    access: string;
};

interface MyCollectionHeaderProps {
    collection: Collection;
}

const MyCollectionHeader = ({ collection }: MyCollectionHeaderProps) => {
    const getFormattedStatus = (status: string) => {
        if (status === 'draft') {
            return 'Чернетка';
        } else if (status === 'active') {
            return 'Активна';
        } else if (status === 'closed') {
            return 'Закрита';
        } else {
            return '-';
        }
    };

    const getFormattedAccess = (access: string) => {
        if (access === 'Admin') {
            return 'Адміністратор';
        } else if (access === 'Moderator') {
            return 'Модератор';
        } else if (access === 'Spectator') {
            return 'Спостерігач';
        } else {
            return '-';
        }
    };
    return (
        <div className="flex justify-between gap-8">
            <div className="rounded-lg bg-primary p-6 text-white space-y-4 max-w-xs flex-grow">
                <p className="flex items-center justify-center">
                    Кількість відповідей
                    <button type="button">
                        <IoIosArrowForward className="h-6 w-6" />
                    </button>
                </p>
                <p className="text-center text-3xl">
                    {collection.answers.length}
                </p>
            </div>
            <CollectionInfoCard
                title={'Статус Колекції'}
                description={getFormattedStatus(collection.status)}
            />
            <CollectionInfoCard
                title={'Дата останньої зміни'}
                description={collection.lastChange}
            />
            <CollectionInfoCard
                title={'Права на колекцію'}
                description={getFormattedAccess(collection.access)}
            />
        </div>
    );
};

export default MyCollectionHeader;
