import axios from 'axios';

import store from '../../store';

import { ACTION_START, ACTION_END } from './http.actionCreators';


const _axios = axios.create();

export const get = _axios.get;
export const post = _axios.post;
export const put = _axios.pus;
export const del = _axios.delete;
export const startAction = (actionKeys) => store.dispatch(ACTION_START(actionKeys));
export const endAction = (actionKeys) => store.dispatch(ACTION_END(actionKeys));
