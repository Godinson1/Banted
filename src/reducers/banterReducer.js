import {  LOADING_BANTERS, GET_ALL_BANTER} from '../actions/types';

const initialState = {
loading_banters: false,
banters: {},
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
 
   default:
       return state;
}
}