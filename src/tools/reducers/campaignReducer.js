import { SET_CAMPAIGNS, SET_CAMPAIGN_COUNT, SET_LOADING, SET_ERROR, ADD_CAMPAIGN, EDIT_CAMPAIGN } from "../actions/campaignActions";

const initialState = {
  campaigns: [],
  campaignCount: 0,
  loading: false,
  error: null,
};

const campaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_CAMPAIGNS:
      return { ...state, loading: false, campaigns: action.payload, error: null };
    case SET_CAMPAIGN_COUNT:
      return { ...state, loading: false, campaignCount: action.payload, };
    case SET_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ADD_CAMPAIGN:
      return { ...state, campaigns: [...state.campaigns, action.payload] };
    case EDIT_CAMPAIGN:
      return {
        ...state,
        campaigns: state.campaigns.map((campaign) =>
          campaign.id === action.payload.id ? action.payload : campaign
        ),
      };
    default:
      return state;
  }
};

export default campaignReducer;
