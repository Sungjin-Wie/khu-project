import { api, searchUrl, infoUrl, auctionUrl } from "../api";

const searchFetchStarted = () => {
  return {
    type: "searchFetchStarted",
    payload: {},
  };
};

const searchFetchCompleted = data => {
  return {
    type: "searchFetchCompleted",
    payload: {
      data,
    },
  };
};

export const fetchSearch = (server, name) => {
  return async dispatch => {
    dispatch(searchFetchStarted());
    const res = await api.get(searchUrl(server, name));
    console.log(res);
    const data = res.data.rows;
    return dispatch(searchFetchCompleted(data));
  };
};

const infoFetchStarted = () => {
  return {
    type: "infoFetchStarted",
    payload: {},
  };
};

const infoFetchCompleted = data => {
  return {
    type: "infoFetchCompleted",
    payload: {
      data,
    },
  };
};

export const fetchInfo = (server, id) => {
  return async dispatch => {
    dispatch(infoFetchStarted());
    const res = await api.get(infoUrl(server, id));
    const data = res.data;
    return dispatch(infoFetchCompleted(data));
  };
};

const auctionFetchStarted = () => {
  return {
    type: "auctionFetchStarted",
    payload: {},
  };
};

const auctionFetchCompleted = data => {
  return {
    type: "auctionFetchCompleted",
    payload: {
      data,
    },
  };
};

export const fetchAuction = value => {
  return async dispatch => {
    dispatch(auctionFetchStarted());
    const res = await api.get(auctionUrl(value));
    console.log(res);
    const data = res.data.rows;
    return dispatch(auctionFetchCompleted(data));
  };
};
