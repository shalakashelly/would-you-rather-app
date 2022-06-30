import {
    GET_QUESTIONS,
    ADD_ANSWER_TO_QUESTION,
    ADD_QUESTION
} from '../actions/questions';

export default function getQuestions(state = {}, action) {
    if (action.type === GET_QUESTIONS) {
        return { ...state, ...action.questions};
    }
    else if (action.type === ADD_ANSWER_TO_QUESTION) {
        const { authUser, qid, answer } = action;
        return {
            ...state,
            [qid]: {
                ...state[qid],
                [answer]: {
                    ...state[qid][answer],
                    votes: state[qid][answer].votes.concat(authUser)
                }
            }
        };
    }
    else if (action.type === ADD_QUESTION) {
        const { question } = action;
        return {
            ...state,
            [question.id]: question
        };
    }
    else return state;
}