import { CHANGE_NAME, GET_HEROES_SUCCESS, ADD_HERO } from '../constants/ActionTypes';

export default function heroAppState(state = [], action) {

    switch (action.type) {

        case GET_HEROES_SUCCESS:
            return [...action.heroes];

        case ADD_HERO:
            return [...state, { id: action.id, name: action.name }];

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