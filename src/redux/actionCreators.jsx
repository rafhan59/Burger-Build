import * as actionType from './actionType';
import axios from 'axios';

export const addIngredient = igtype => {
    return{
        type: actionType.ADD_INGREDIENT,
        payload: igtype
    }
}

export const removeIngredient = igtype => {
    return{
        type: actionType.REMOVE_INGREDIENT,
        payload: igtype
    }
}

export const updatePurchasable = () => {
    return{
        type: actionType.UPDATE_PURCHASABLE
    }
}
export const resetIngredients = () => {
    return{
        type: actionType.RESET_INGREDIENTS
    }
}

export const loadOrders = orders => {
    return {
        type: actionType.LOAD_ORDERS,
        payload: orders
    }
}

export const orderLoadFailed = () => {
    return{
        type: actionType.ORDER_LOAD_FAILED,
    }
}

export const fetchOrders = (token, userId) => dispatch => {
    const queryParam = '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('https://burger-builder-d5eaa.firebaseio.com/orders.json?auth=' + token + queryParam)
        .then(response => {
            dispatch(loadOrders(response.data))
        })
        .catch(err =>{
            dispatch(orderLoadFailed())
        })
}