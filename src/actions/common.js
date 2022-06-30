import { getInitialData } from '../utils/api';
import { getQuestions } from '../actions/questions';
import { getUsers } from '../actions/users';

export function handleInitialData() {
  return dispatch => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(getQuestions(questions));
      dispatch(getUsers(users));
    });
  };
}