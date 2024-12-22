import { logOut } from '@/redux/features/me/meSlice';
import AuthClientService from '@/services/auth';
import { IoMdExit } from 'react-icons/io';
import { useDispatch } from 'react-redux';

import styles from '../../styles.module.scss';

const LogOutButton = () => {
    const dispatch = useDispatch();
    const logOutHandle = async () => {
        const res = await AuthClientService.logOut();
        if (res) return dispatch(logOut());
    };
    return (
        <div onClick={logOutHandle} className={styles['exit-action-wrapper']}>
            <IoMdExit />
            <span> Вийти </span>
        </div>
    );
};

export default LogOutButton;
