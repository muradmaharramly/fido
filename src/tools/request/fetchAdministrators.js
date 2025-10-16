import store from "../store/store";
import { supabase } from "../../services/supabaseClient";
import { setAdministratorCount } from "../actions/administratorActions";

export const fetchAdministrators = async () => {
    store.dispatch({ type: "SET_ADMIN_LOADING", payload: true });

    try {
        const { data, error } = await supabase.from("administrators").select("*", { count: "exact" });
        if (error) throw error;

        const administratorCount = data.length;

        store.dispatch({ type: "SET_ADMINISTRATORS", payload: data });
        store.dispatch(setAdministratorCount(administratorCount));
        console.log("Fetched administrators from Supabase:", data);
        console.log("Total administrator count:", administratorCount);
    } catch (error) {
        store.dispatch({ type: "SET_ADMIN_ERROR", payload: error.message });
        console.error("Error fetching administrators:", error.message);
    }
};
