import React,{createContext, useReducer} from 'react';
import AppReducer from './AppReducer';
import {Items} from "../data";

const initialState = {
    title:"Item Editor",
    selected:0,
    items:Items,
    past:[],
    present:Items,
    future:[]
};
export const ItemContext = createContext(initialState);

export const ItemProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    function undoItem(id) {
        console.log("undoing item:", id);
        dispatch({
            type:"UNDO_ITEM",
            payload:id
        })
    }

    function redoItem(id) {
        console.log("redoing item:", id);
        dispatch({
            type:"REDO_ITEM",
            payload:id
        })
    }

    function saveItem(items) {
        console.log("saving item!!!!: ", items);
        dispatch({
          type:"SAVE_ITEM",
          payload:items
        })
    }

    function cancelItem(id) {
        console.log("canceling item:", id);
        dispatch({
            type:"CANCEL_ITEM",
            payload:id
        })
    }

    function setSelectedItem (value) {
        dispatch({
            type: "SET_SELECTED",
            payload: value
        })
    }

    return(
        <ItemContext.Provider value={{
            title: state.title,
            items: state.present,
            selected: state.selected,
            setSelectedItem,
            undoItem,
            redoItem,
            saveItem,
            cancelItem,
        }}>
            {children}
        </ItemContext.Provider>
    )
};