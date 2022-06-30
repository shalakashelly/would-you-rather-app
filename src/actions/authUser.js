export const AUTH_USER_REQ = 'AUTH_USER_REQ';

export function authUserRequest(id) {
  return {
    type: AUTH_USER_REQ,
    id
  };
}
