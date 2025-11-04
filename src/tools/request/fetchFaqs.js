import store from "../store/store";
import { supabase } from "../../services/supabaseClient";
// fetchFaqs.js
import { setFaqs, addFaq, setLoading, setError, setFaqCount } from "../actions/faqactions";

export const fetchFaqs = async () => {
  store.dispatch({ type: "SET_LOADING", payload: true });

  try {
    const { data, error } = await supabase
      .from("FAQS")
      .select("*", { count: "exact" })
      .order("id", { ascending: true });

    if (error) throw error;

    const faqCount = data?.length || 0;

    store.dispatch(setFaqs(data));
    store.dispatch({ type: "SET_FAQ_COUNT", payload: faqCount });

    console.log("Fetched FAQs from Supabase:", data);
    console.log("Total FAQ count:", faqCount);
  } catch (error) {
    store.dispatch({ type: "SET_ERROR", payload: error.message });
    console.error("Error fetching FAQs:", error.message);
  } finally {
    store.dispatch({ type: "SET_LOADING", payload: false });
  }
};
