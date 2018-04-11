import { combineReducers } from "redux";
import booksReducer from "./booksReducer";
import authorsReducer from "./authorsReducer";

export default combineReducers({ booksReducer, authorsReducer });
