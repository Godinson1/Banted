import {  LOADING_BANTERS, GET_ALL_BANTER, 
          LIKE_BANTER, UNLIKE_BANTER} from '../actions/types';

const initialState = {
loading_banters: false,
banters: []
}

export default function(state = initialState, action){
switch(action.type) {
   case LOADING_BANTERS:
       return {
           loading_banters: true
       };
   case GET_ALL_BANTER:
   return {
       loading_banters: false,
       banters: action.payload
   };
   case LIKE_BANTER:
   case UNLIKE_BANTER:
       let index = state.banters.findIndex((banter) => banter._id === action.payload.banterData._id)
       state.banters[index] = action.payload.banterData
       return {
         ...state
       }
 
   default:
       return state;
}
}