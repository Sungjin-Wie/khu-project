const searchState = {
  isFetching: false,
  hasResult: false,
  isEmpty: true,
  data: [],
  page: 1,
  pageSize: 9,
};

const searchReducer = (state = searchState, action) => {
  const { type } = action;
  switch (type) {
    case "search": {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    }
    case "searchFetchStarted":
      return {
        ...state,
        hasResult: false,
        isFetching: true,
      };
    case "searchFetchCompleted": {
      const { data } = action.payload;
      return {
        ...state,
        data,
        isFetching: false,
        hasResult: true,
      };
    }
    default:
      return state;
  }
};

export default searchReducer;
