import { IoShareSocial } from 'react-icons/io5';
import { MdLink } from 'react-icons/md';
import CollectionButtonWrapper from './CollectionButton';

const MyCollectionBody = () => {
    return (
        <div className="grid grid-cols-4 gap-8 flex-grow">
            <div className="bg-white border-2 border-primary p-6 rounded-lg col-span-3 h-full min-h-96" />
            <div className="flex justify-end">
                <div className="flex flex-col items-end col-span-1 justify-between max-w-[20rem] w-full">
                    <div className="flex flex-col w-full space-y-4">
                        <CollectionButtonWrapper>
                            <span>К-сть правильних відповідей</span>
                        </CollectionButtonWrapper>
                        <CollectionButtonWrapper variant="primary">
                            <span>Редагувати</span>
                        </CollectionButtonWrapper>
                    </div>
                    <div className="flex flex-col w-full space-y-4">
                        <CollectionButtonWrapper>
                            <div className="rounded-full p-4 bg-bg-secondary">
                                <IoShareSocial className="h-6 w-6" />
                            </div>
                            <span>Поширити опитування</span>
                        </CollectionButtonWrapper>
                        <CollectionButtonWrapper>
                            <div className="rounded-full p-4 bg-bg-secondary">
                                <MdLink className="h-6 w-6" />
                            </div>
                            <span>Поширити статистику</span>
                        </CollectionButtonWrapper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCollectionBody;
