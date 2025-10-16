import { SET_NEWS, SET_NEWS_COUNT, SET_LOADING, SET_ERROR, ADD_NEWS, EDIT_NEWS } from "../actions/newsActions";

const initialState = {
  news: [],
  newsCount: 0,
  loading: false,
  error: null,
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_NEWS:
      return { ...state, loading: false, news: action.payload, error: null };
    case SET_NEWS_COUNT:
      return { ...state, loading: false, newsCount: action.payload, };
    case SET_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ADD_NEWS:
      return { ...state, news: [...state.news, action.payload] };
    case EDIT_NEWS:
      return {
        ...state,
        news: state.news.map((singlenews) =>
          singlenews.id === action.payload.id ? action.payload : singlenews
        ),
      };
    default:
      return state;
  }
};

export default newsReducer;
