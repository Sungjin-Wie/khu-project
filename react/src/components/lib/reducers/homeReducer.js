const homeState = {
  server: "all",
  name: "",
};

const homeReducer = (state = homeState, action) => {
  const { type } = action;
  switch (type) {
    case "server":
    case "name":
      return {
        ...state,
        [type]: action.payload,
      };
    default:
      return state;
  }
};

export default homeReducer;
