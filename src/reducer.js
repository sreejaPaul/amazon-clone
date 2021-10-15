export const initialState = {
    basket: [],
    user: null,
    address: null,
};

// Selector
export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item],
            };
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }
        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex((item) => item.id === action.id);
            let newBasket = [...state.basket];
            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(`Can't remove product (id : ${action.id} as it is not in the baslet`);
            }
            return {
                ...state,
                basket: newBasket
            };
        case 'SET_USER':
            return {
                ...state, user: action.user
            };
        case 'ADD_ADDRESS':
            return {
                ...state, address: action.address
            }
        default:
            return state;
    }
};

export default reducer;