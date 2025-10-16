import { supabase } from "../../services/supabaseClient";
import store from "../store/store";
import { setCampaigns, setCampaignCount, setLoading, setError } from "../actions/campaignActions";

export const fetchCampaigns = async () => {
    store.dispatch(setLoading(true));

    try {
        const { data: campaignData, error: campaignError } = await supabase
            .from("campaigns")
            .select("*", { count: "exact" });

        if (campaignError) throw campaignError;

        const campaignCount = campaignData.length;

        store.dispatch(setCampaigns(campaignData));
        store.dispatch(setCampaignCount(campaignCount));

        console.log("Fetched campaign from Supabase:", campaignData);
        console.log("Total campaign count:", campaignCount);
    } catch (error) {
        store.dispatch(setError(error.message));
        console.error("Error fetching campaign:", error.message);
    }
};
