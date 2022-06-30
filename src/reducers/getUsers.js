import {
    GET_USERS,
    ADD_ANSWER_TO_USER,
    ADD_QUESTION_TO_USER
} from '../actions/users';

export default function getUsers(state = {}, action) {
    if (action.type === GET_USERS) {
        return { ...state, ...action.users};
    }
    else if (action.type === ADD_ANSWER_TO_USER) {
        const { authUser, qid, answer } = action;
        return {
            ...state,
            [authUser]: {
                ...state[authUser],
                answers: {
                ...state[authUser].answers,
                [qid]: answer
                }
            }
        };
    }
    else if (action.type === ADD_QUESTION_TO_USER) {
        const { id, author } = action;
        return {
            ...state,
            [author]: {
            ...state[author],
            questions: state[author].questions.concat(id)
            }
        };
    }
    else return state;
}