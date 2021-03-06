import { combineReducers } from 'redux';

import { SIGNUP_ERROR_MESSAGE, SIGNUP_FORM_INPUT, SIGNUP_SUCCESS, VALIDATE_SIGNUP_FORM, SIGNUP_SUCCESS_MESSAGE } from '../actions';

// 注册出错信息，可能是用户已存在
function errMes(state = '', action) {
  if (action.type === SIGNUP_ERROR_MESSAGE) {
    return action.message;
  }
  return state;
}


// 注册表单输入
const inputInitial = {
  name: '',
  email: '',
  password: '',
  confirm: '',
};
function formInput(state = inputInitial, action) {
  if (action.type === SIGNUP_FORM_INPUT) {
    if (action.clean) return inputInitial;
    return Object.assign({}, state, action.input);
  }
  return state;
}

// 注册成功状态
function success(state = false, action) {
  if (action.type === SIGNUP_SUCCESS) {
    return action.success;
  }
  return state;
}

// 注册表单验证信息
function validateMes(state = {
  name: '',
  email: '',
  password: '',
  confirm: '',
  valid: false,
}, action) {
  if (action.type === VALIDATE_SIGNUP_FORM) {
    return Object.assign({}, state, {
      name: action.validateErr.name,
      email: action.validateErr.email,
      password: action.validateErr.password,
      confirm: action.validateErr.confirm,
    });
  }
  return state;
}

// 显示 “注册成功” 的信息
function successMes(state = '', action) {
  if (action.type === SIGNUP_SUCCESS_MESSAGE) {
    if (action.clean) return '';
    return action.text;
  }
  return state;
}

export default combineReducers({
  errMes,
  formInput,
  success,
  validateMes,
  successMes,
});
