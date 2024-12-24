import styles from './styles.module.scss';

const FullLoading = () => {
    return (
        <div className={styles['loading-wrapper']}>
            <div className={styles['loader']} />
        </div>
    );
};

export default FullLoading;
