const infoState = {
  isFetching: false,
  data: {},
};

const infoReducer = (state = infoState, action) => {
  const { type } = action;
  switch (type) {
    case "search": {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    }
    case "infoFetchStarted":
      return {
        ...state,
        isFetching: true,
      };
    case "infoFetchCompleted": {
      const { data } = action.payload;
      return {
        ...state,
        data,
        isFetching: false,
      };
    }

    default:
      return state;
  }
};

export default infoReducer;
