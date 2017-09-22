import { SHOW_LOADER, HIDE_LOADER } from '../constants/ActionTypes';

export default function loaderState(state = true, action) {

    switch (action.type) {

        case SHOW_LOADER:
            return true;

        case HIDE_LOADER:
            return false;

        default:
            return state;
    }
}