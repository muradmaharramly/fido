import { createStore, combineReducers } from "redux";
import productReducer from "../reducers/productReducer"; 
import newsReducer from "../reducers/newsReducer";
import campaignReducer from "../reducers/campaignReducer";
import adminReducer from "../reducers/administratorReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const enhancer =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(...middleware))
    : applyMiddleware(...middleware);

const rootReducer = combineReducers({
    products: productReducer, 
    news: newsReducer,
    campaigns: campaignReducer,
    administrators: adminReducer
});

const store = createStore(rootReducer);

export default store;
