import {
  SET_FAQS,
  ADD_FAQ,
  REMOVE_FAQ,
  EDIT_FAQ,
  SET_LOADING,
  SET_ERROR,
  SET_FAQ_COUNT,
} from "../actions/faqactions";

const initialState = {
  faqs: [],
  loading: false,
  error: null,
  faqCount: 0,
};

export default function faqReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };

    case SET_ERROR:
      return { ...state, error: action.payload };

    case SET_FAQS:
      return { ...state, faqs: action.payload, error: null };

    case ADD_FAQ:
      return { ...state, faqs: [...state.faqs, action.payload] };

    case REMOVE_FAQ:
      return {
        ...state,
        faqs: state.faqs.filter((faq) => faq.id !== action.payload),
      };

    case EDIT_FAQ:
      return {
        ...state,
        faqs: state.faqs.map((faq) =>
          faq.id === action.payload.id
            ? { ...faq, ...action.payload.updates }
            : faq
        ),
      };

    case SET_FAQ_COUNT:
      return { ...state, faqCount: action.payload };

    default:
      return state;
  }
}
