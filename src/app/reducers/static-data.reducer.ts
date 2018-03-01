import { ImageSelectorItem } from '../models'; 
import { IAction } from './action'

export interface IStaticDataState {
    sizes: ImageSelectorItem[];
    toppings: ImageSelectorItem[];
}

export const initialState: IStaticDataState = {
    sizes: [],
    toppings: []
};

export function staticDataReducer(state: IStaticDataState = initialState, action: IAction) {
    
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
