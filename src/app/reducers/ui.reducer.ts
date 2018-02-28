import { IAction } from './action'
import { ImageSelectorItem } from '../models'

export interface IOrder {
    selectedPizza: ImageSelectorItem;
    selectedToppings: ImageSelectorItem[];
}

export interface IUIState {
    orders: IOrder[],
    currentOrder: IOrder,
    currentPage: string
}

export const initialState: IUIState = {
    orders: [],
    currentOrder: null,
    currentPage: ''
};

export function uiReducer(state: IUIState = initialState, action: IAction) {
    
    let newState;
    
    switch (action.type) {
        case 'ADD_ORDER':
            newState = Object.assign({}, state, { orders: [...state.orders, action.payload] });
            break;
        case 'DELETE_ORDER':
            newState = Object.assign({}, state, {orders: state.orders.filter((order, index) => index !== action.payload)})
            break;
        default:
            newState = state;
            break;
    }
    
    return newState;
}
