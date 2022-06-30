import {AUTH_USER_REQ} from '../actions/authUser';

export default function authUser(state=null, action) {
    if (action.type === AUTH_USER_REQ) {
        return action.id;
    }
    return state;
}
