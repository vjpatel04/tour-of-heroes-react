import { CHANGE_NAME, GET_HEROES_SUCCESS, ADD_HERO, DELETE_HERO } from '../constants/ActionTypes';

export default function heroAppState(state = [], action) {

    switch (action.type) {

        case GET_HEROES_SUCCESS:
            return [...action.heroes];

        case ADD_HERO:
            return [...state, { id: action.id, name: action.name }];

        case DELETE_HERO:
            let currentIndex = state.map((hero) => hero.id).indexOf(action.id);
            return [...state.slice(0, currentIndex), ...state.slice(currentIndex+1)];

        case CHANGE_NAME:
            return state.map((hero) => {
                if (hero.id == action.id) {
                    return { ...hero, name: action.name }
                }
                return hero;
            });

        default:
            return state;
    }
}