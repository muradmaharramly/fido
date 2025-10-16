export const SET_CAMPAIGNS = "SET_CAMPAIGNS";
export const SET_CAMPAIGN_COUNT = "SET_CAMPAIGN_COUNT";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const ADD_CAMPAIGN = "ADD_CAMPAIGN";
export const EDIT_CAMPAIGN = "EDIT_CAMPAIGN";

export const setCampaigns = (campaigns) => ({
  type: SET_CAMPAIGNS,
  payload: campaigns,
});
export const setCampaignCount = (count) => ({
  type: SET_CAMPAIGN_COUNT,
  payload: count,
});
export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const addCampaign = (campaign) => ({
    type: ADD_CAMPAIGN,
    payload: campaign,
});

export const editCampaign = (updatedCampaigns) => ({
    type: EDIT_CAMPAIGN,
    payload: updatedCampaigns,
});
