const auctionState = {
  value: "",
  isFetching: false,
  isEmpty: true,
  searchFlag: false,
  data: [],
};

const auctionReducer = (state = auctionState, action) => {
  const { type } = action;
  switch (type) {
    case "searchFlag":
      return { ...state, searchFlag: true };
    case "auctionInput": {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    }
    case "auctionFetchStarted":
      return {
        ...state,
        isFetching: true,
      };
    case "auctionFetchCompleted": {
      const { data } = action.payload;
      let isEmpty = true;
      if (data) {
        console.log(data);
        if (data.length !== 0) {
          isEmpty = false;
        }
      }
      return {
        ...state,
        data,
        isFetching: false,
        isEmpty,
        searchFlag: false,
      };
    }
    default:
      return state;
  }
};

export default auctionReducer;
