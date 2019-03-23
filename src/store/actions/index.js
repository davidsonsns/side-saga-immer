const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

function action(type, payload = {}) {
  return { type, ...payload };
}

// AUTH
export const SIGNUP = createRequestTypes('SIGNUP');
export const SIGNIN = createRequestTypes('SIGNIN');
export const SIGNOUT = createRequestTypes('SIGNOUT');
export const LOAD_USER = createRequestTypes('LOAD_USER');

export const signupActions = {
  request: params => action(SIGNUP[REQUEST], params),
  success: user => action(SIGNUP[SUCCESS], { user }),
  failure: error => action(SIGNUP[FAILURE], { error })
};

export const signinActions = {
  request: params => action(SIGNIN[REQUEST], params),
  success: user => action(SIGNIN[SUCCESS], { user }),
  failure: error => action(SIGNIN[FAILURE], { error })
};

export const signoutActions = {
  request: () => action(SIGNOUT[REQUEST]),
  success: () => action(SIGNOUT[SUCCESS]),
  failure: error => action(SIGNOUT[FAILURE], { error })
};

export const loadUserActions = {
  request: () => action(LOAD_USER[REQUEST]),
  success: user => action(LOAD_USER[SUCCESS], { user }),
  failure: error => action(LOAD_USER[FAILURE], { error })
};

// TODOS
export const TODOS_INSERT = createRequestTypes('TODOS_INSERT');
export const TODOS_INSERT_INPUT_UPDATE = 'TODOS_INSERT_INPUT_UPDATE';

export const todosInsertUpdateInput = value => ({
  type: TODOS_INSERT_INPUT_UPDATE,
  value
});

export const todosInsertActions = {
  request: value => action(TODOS_INSERT[REQUEST], { value }),
  success: () => action(TODOS_INSERT[SUCCESS]),
  failure: error => action(TODOS_INSERT[FAILURE], { error })
};
