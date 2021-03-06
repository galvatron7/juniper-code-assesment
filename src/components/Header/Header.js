import React from "react";
import * as CONSTANTS from "../../Constants";

const Header = (props) => {
    const {undoItem, redoItem, cancelItem, title, selected, items, onSave} = props;
    const onUndo = () => {
        undoItem(selected);
    };
    const onRedo = () => {
        redoItem(selected);
    };

    const onCancel = () => {
        const currItems = items.reduce((accum, item) => {
            if(item.id == selected){
                item.fields.forEach((field) => {
                    switch (field.fieldType) {
                        case CONSTANTS.TEXT:
                        case CONSTANTS.OPTION:
                            field.fieldValue = "";
                        case CONSTANTS.TOGGLE:
                            field.fieldValue = false;
                        default:
                            field.fieldValue = ""
                    }
                });
            }
            accum.push(item);
            return accum;
        },[]);
        cancelItem(currItems);
    };

    const menu = [{
            label:CONSTANTS.UNDO_LABEL,
            action: () => {undoItem(selected)}
        }, {
            label:CONSTANTS.SAVE_LABEL,
            action: () => {onSave()}
        }, {
            label:CONSTANTS.REDO_LABEL,
            action: () => {redoItem(selected)}
        }, {
            label:CONSTANTS.CANCEL_LABEL,
             action: () => {onCancel()}
        }];

    return(
        <header className="header">
            <div className="logo">
                <a href="#" className="brand">{title}</a>
            </div>
            <nav className="nav">
                <ul>
                    {
                        menu.map((item, idx) =>
                            <li key={idx}><a onClick={() => item.action()} href="#">{item.label}</a></li>
                        )
                    }
                </ul>
            </nav>
        </header>
    )
};

export default Header;