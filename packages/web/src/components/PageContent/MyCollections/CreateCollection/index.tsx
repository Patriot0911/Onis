import { BsPlusLg } from "react-icons/bs";
import CardWrapper from "./CardWrapper";

import styles from './styles.module.scss';

const CreateCollection = () => {
    return (
        <CardWrapper>
            <div
                className={styles['wrapper']}
                onClick={() => {}}
            >
                <BsPlusLg />
                <span>Додати колекцію</span>
            </div>
        </CardWrapper>
    );
};

export default CreateCollection;
