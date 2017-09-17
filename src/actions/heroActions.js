import * as types from '../constants/ActionTypes';
import fetchHeroes from '../api/heroes';

export function changeName({id, name}){
    return { type: types.CHANGE_NAME, id, name };
}

export function getHeroes(){
    return (dispatch) => {
        fetchHeroes().then((heroes) => {
            dispatch(getHeroesSuccess(heroes));
        })
    }
}

function getHeroesSuccess(heroes){
    return {
        type: types.GET_HEROES_SUCCESS,
        heroes
    }
}