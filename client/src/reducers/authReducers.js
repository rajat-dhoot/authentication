import { SET_CURRENT_USER, TOGGLE_LOADING } from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
   isAuthenticated: false,
   user: {},
   loading: false
};

export default function(state = initialState, action) {
   switch (action.type) {
      case SET_CURRENT_USER:
         return {
            ...state,
            isAuthenticated: !isEmpty(action.payload),
            user: action.payload
         };
      case TOGGLE_LOADING:
         return {
            ...state,
            loading: !state.loading
         };
      default:
         return state;
   }
}
