export const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGOUT":
      return { ...state, feeds: [], categories: [], totalPages: 0 };
    case "SET_FEEDS_AND_CATEGORIES":
      return {
        ...state,
        feeds: action.payload[0].feeds,
        totalPages: action.payload[0].totalPages,
        categories: action.payload[1],
      };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "ADD_CATEGORY":
      return { ...state, categories: [action.payload, ...state.categories] };
    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          (e) => e._id !== action.payload._id
        ),
      };
    default:
      return { ...state };
  }
};
