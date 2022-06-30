import { combineReducers } from 'redux';
import authUser from '../reducers/authUser';
import getQuestions from '../reducers/getQuestions';
import getUsers from '../reducers/getUsers';

export default combineReducers({
    authUser,
    getQuestions,
    getUsers
});