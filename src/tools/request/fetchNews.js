import { supabase } from "../../services/supabaseClient";
import store from "../store/store";
import { setNews, setNewsCount, setLoading, setError } from "../actions/newsActions";

export const fetchNews = async () => {
    store.dispatch(setLoading(true));

    try {
        const { data: newsData, error: newsError } = await supabase
            .from("news")
            .select("*", { count: "exact" }) 
            .order("date", { ascending: false });

        if (newsError) throw newsError;

        const newsCount = newsData.length;

        store.dispatch(setNews(newsData));
        store.dispatch(setNewsCount(newsCount));

        console.log("Fetched news from Supabase:", newsData);
        console.log("Total news count:", newsCount);
    } catch (error) {
        store.dispatch(setError(error.message));
        console.error("Error fetching news:", error.message);
    }
};
