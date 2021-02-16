import {act} from "@testing-library/react";
import * as CONSTANTS from "../Constants";

export default (state, action) => {
    const {past, present, future} = state;
    switch(action.type){
        case CONSTANTS.UNDO:
            if( past.length <= 0) {
                return {...state};
            }
            const previous = past[past.length - 1];
            const newPast = past.slice(0, past.length - 1);

            console.log("NEW PREVIOUS: ", newPast);
            console.log("NEW PAST: ", newPast);
            return {
                ...state,
                past: newPast,
                present: previous,
                future: [present, ...future]
            };
        case CONSTANTS.REDO:
            if(future.length <= 0){
                return {...state};
            }
            const next = future[0];
            const newFuture = future.slice(1);
            console.log("NEW FUTURE: ", newFuture);
            return {
                ...state,
                past: [...past, present],
                present: next,
                future: newFuture
            };
        case CONSTANTS.SAVE:
            console.log("Past: ", past);
            console.log("Present: ", present);
            return {
                ...state,
                past:[...past, present],
                present:present
            };
        case CONSTANTS.CANCEL:
            return {
                ...state
            };
        case CONSTANTS.SELECTED:
            return {
                ...state,
                selected: action.payload
            };
        default:
            return state;
    }
}