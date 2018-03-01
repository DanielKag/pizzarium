import { IAction } from './action'
import { ImageSelectorItem } from '../models'
import { Order } from '../models';

export interface IUIState {
    orders: Order[],
    totalPrice: number
}

export const initialState: IUIState = {
    orders: [],
    totalPrice: 0
};

export function uiReducer(state: IUIState = initialState, action: IAction) {
    
    let newState;
    
    switch (action.type) {
        case 'ADD_ORDER':
            newState = Object.assign({}, state, { orders: [...state.orders, action.payload], totalPrice: state.totalPrice + action.payload.getTotalPrice() });
            break;
        case 'DELETE_ORDER':
            let newPrice = state.totalPrice - action.payload.order.getTotalPrice();
            newState = Object.assign({}, state, {orders: state.orders.filter((order, index) => index !== action.payload.pizzaIndex), totalPrice: newPrice });
            break;
        case 'CLEAR_CART':
            newState = Object.assign({}, state, {orders: [], totalPrice: 0})
            break;
        default:
            newState = state;
            break;
    }
    
    return newState;
}
