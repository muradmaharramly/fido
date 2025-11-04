import { createStore, combineReducers } from "redux";
import productReducer from "../reducers/productReducer"; 
import newsReducer from "../reducers/newsReducer";
import campaignReducer from "../reducers/campaignReducer";
import adminReducer from "../reducers/administratorReducer";
import faqReducer from "../reducers/faqreducer";

const rootReducer = combineReducers({
    products: productReducer, 
    news: newsReducer,
    campaigns: campaignReducer,
    faqs: faqReducer,
    administrators: adminReducer
});

const store = createStore(rootReducer);

export default store;
