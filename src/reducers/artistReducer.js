
import {GET_ARTISTS, GET_ERRORS, GET_MVIDS, GET_ALBUMS} from "../actions/types";

const initialState={
    artists:[],
    errors:[],
    mvids:[],
    albums:[]
};
export default function (state=initialState,action) {
    switch (action.type) {
        case GET_ARTISTS:
            return{
                ...state,
                artists:action.payload
            };
        case GET_ERRORS:
            return {
                ...state,
                errors: action.payload
            }
        case GET_MVIDS:
            return{
                ...state,
                mvids:action.payload
            };
        case GET_ALBUMS:
            return{
                ...state,
                albums:action.payload
            };
            default:
                return state
    }
}