export const SET_FAQS = "SET_FAQS";
export const ADD_FAQ = "ADD_FAQ";
export const REMOVE_FAQ = "REMOVE_FAQ";
export const EDIT_FAQ = "EDIT_FAQ";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const SET_FAQ_COUNT = "SET_FAQ_COUNT";

export const setFaqs = (faqs) => ({
  type: SET_FAQS,
  payload: faqs,
});

export const addFaq = (faq) => ({
  type: ADD_FAQ,
  payload: faq,
});

export const removeFaq = (id) => ({
  type: REMOVE_FAQ,
  payload: id,
});

export const editFaq = (id, updates) => ({
  type: EDIT_FAQ,
  payload: { id, updates },
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const setFaqCount = (count) => ({
  type: SET_FAQ_COUNT,
  payload: count,
});