import * as types from '../constants/ActionTypes';
import fetchHeroes from '../api/heroes';

export function changeName({id, name}){
    return { type: types.CHANGE_NAME, id, name };
}

export function addHero({id, name}){
    return { type: types.ADD_HERO, id, name };
}

export function getHeroes(){
    return (dispatch) => {
        dispatch(showLoader());
        fetchHeroes().then((heroes) => {
            dispatch(hideLoader());
            dispatch(getHeroesSuccess(heroes));
        },
    (error) => {
        dispatch(hideLoader());
        dispatch(getHeroesError(error));
    })
    }
}

function getHeroesSuccess(heroes){
    return {
        type: types.GET_HEROES_SUCCESS,
        heroes
    }
}

function getHeroesError(error){
    return {
        type: 'GET_HEROES_ERROR',
        error
    }
}

function showLoader(){
    return {
        type: types.SHOW_LOADER,
        showLoader: true
    }
}

function hideLoader(){
    return {
        type: types.HIDE_LOADER,
        showLoader: false
    }
}

export function deleteHero({ id }){
    return { type: types.DELETE_HERO, id };
}