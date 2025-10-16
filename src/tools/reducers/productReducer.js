import { SET_PRODUCTS, SET_PRODUCT_COUNT, SET_LOADING, SET_ERROR, ADD_PRODUCT, EDIT_PRODUCT } from "../actions/productActions";

const initialState = {
    products: [],
    productCount: 0,
    loading: false,
    error: null,
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: action.payload };
        case SET_PRODUCTS:
            return { ...state, loading: false, products: action.payload };
        case SET_PRODUCT_COUNT:
            return { ...state, loading: false, productCount: action.payload };
        case SET_ERROR:
            return { ...state, loading: false, error: action.payload };
        case ADD_PRODUCT:
            return { ...state, products: [...state.products, action.payload] };
        case EDIT_PRODUCT:
            return {
                ...state,
                products: state.products.map((product) =>
                    product.id === action.payload.id ? action.payload : product
                ),
            };
        default:
            return state;
    }
};

export default productReducer;
