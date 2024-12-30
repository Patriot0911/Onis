import { ICollectionCard } from './CollectionCard';
import { IoSettings } from 'react-icons/io5';
import CardWrapper from './CardWrapper';

import styles from './styles.module.scss';

const CollectionCard = ({ name, id, description, }: ICollectionCard.ICollectionCardProps) => {
    const editHandle = () => {
        console.log(id);
    };
    const settingsHandle = () => {
        console.log(id);
    };
    return (
        <CardWrapper
            handle={editHandle}
            label={'Редагувати'}
        >
            <div
                className={styles['button-wrapper']}
                onClick={settingsHandle}
            >
                <IoSettings
                    className={styles['settings-button']}
                />
            </div>
            <div
                className={styles['main']}
            >
                <span
                    className={styles['item-heading']}
                >{name}</span>
                <div
                    className={styles['item-description']}
                >{description}</div>
            </div>
        </CardWrapper>
    );
};

export default CollectionCard;
