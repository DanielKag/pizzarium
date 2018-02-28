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
        case 'GET_TOPPINGS_SUCCESS':
            newState = Object.assign({}, state, { toppings: action.payload.response});
            break;
        case 'GET_SIZES_SUCCESS':
            newState = Object.assign({}, state, { sizes: action.payload.response});
            break;
        default:
            newState = state;
            break;
    }
    
    return newState;
}
