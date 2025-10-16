import store from "../store/store";
import { supabase } from "../../services/supabaseClient";
import { setProductCount } from "../actions/productActions";

export const fetchProducts = async () => {
    store.dispatch({ type: "SET_LOADING", payload: true });

    try {
        const { data, error } = await supabase.from("products").select("*", { count: "exact" });
        if (error) throw error;
        
        const productCount = data.length;

        store.dispatch({ type: "SET_PRODUCTS", payload: data });
        store.dispatch(setProductCount(productCount));
        console.log("Fetched products from Supabase:", data);
        console.log("Total product count:", productCount);
    } catch (error) {
        store.dispatch({ type: "SET_ERROR", payload: error.message });
        console.error("Error fetching products:", error.message);
    }
};
