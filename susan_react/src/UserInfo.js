import { useDispatch } from 'react-redux';
import { checklogin } from './authSlice';

const UserInfo = () => {
    const dispatch = useDispatch();
    dispatch(checklogin()); //nếu thông tin user ko có trong store thì xem trong localstorage 
    return (<></>);
};
export default UserInfo;
