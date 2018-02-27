import { ImageSelectorItem } from '../models'; 
import { IAction } from './action'

export interface IDataFromServerState {
    sizes: ImageSelectorItem[];
    toppings: ImageSelectorItem[];
}

export const initialState: IDataFromServerState = {
    sizes: [],
    toppings: []
};

export function dataFromServerReducer(state: IDataFromServerState = initialState, action: IAction) {
    
    let newState;

    switch (action.type) {
        default:
            newState = state;
            break;
    }
    
    return newState;
}

export const dataFromServer = {
    dataFromServerReducer
};