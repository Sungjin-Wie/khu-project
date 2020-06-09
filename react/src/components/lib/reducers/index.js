import { combineReducers } from "redux";
import home from "./homeReducer";
import search from "./searchReducer";
import info from "./infoReducer";
import auction from "./auctionReducer";

export default combineReducers({ home, search, info, auction });
