import Axios from "axios";
import {IP, GET_ARTISTS, GET_ERRORS, GET_MVIDS, GET_ALBUMS} from "./types"

export const getArtists = (data) => dispatch=>{
    Axios.get(IP+'search.php?s='+data).then(
        res=>{
            return dispatch({
                type: GET_ARTISTS,
                payload: res.data
            })
        }
    ).catch(err=>{
        return dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

export const getMvids = (data) => dispatch=>{
    Axios.get(IP+'mvid.php?i='+data).then(
        res=>{
            return dispatch({
                type: GET_MVIDS,
                payload: res.data
            })
        }
    ).catch(err=>{
        return dispatch({
            type: GET_MVIDS,
            payload: err.response.data
        })
    })
}
export const getAlbums = (data) => dispatch=>{
    Axios.get(IP+'searchalbum.php?s='+data).then(
        res=>{
            return dispatch({
                type: GET_ALBUMS,
                payload: res.data
            })
        }
    ).catch(err=>{
        return dispatch({
            type: GET_ALBUMS,
            payload: err.response.data
        })
    })
}