import { Action } from 'redux'

export interface IAction extends Action {
    type: string;
    payload?: any;
}