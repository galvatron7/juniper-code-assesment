import React, {useEffect, forwardRef, useImperativeHandle} from "react";
import ToggleField from "./Fields/ToggleField";
import TextField from "./Fields/TextField";
import OptionField from "./Fields/OptionField";
import * as CONSTANTS from "../../Constants";

const FormContainer = forwardRef(({fields, name, selected, items, saveItem, setToPrevious, historyCount}, ref) =>  {

    const [currFields, setFields] = React.useState([]);
    const [fieldsToSave, setFieldsToSave] = React.useState({});
    const [show, setShow] = React.useState(false);
    const [count, setCount] = React.useState(0);
    useEffect(() => {
       setFields([...fields]);
    },[selected]);

    useEffect(() => {
        setFields([...fields]);
    },[items]);

    useEffect(() => {
       setCount(historyCount);
        showCount();
    },[historyCount]);
    function onFieldAction (id, value) {
        setFieldsToSave({...fieldsToSave, [id]:value});
    }

    function showCount(){
        setShow(true);
        setTimeout(() => {
            setShow(false);
        },3000);
    }

    const onFieldsSave = (e) => {
        new Promise((resolve, reject) => {
            if(!Object.entries(fieldsToSave).length){
                reject()
            } else{
                // preserve current
                setToPrevious(items);
                resolve();
            }
        }).then(() => {
            const updateFields = fields.reduce((accum, field) => {
                if(fieldsToSave[field.id]){
                    accum.push({...field, fieldValue: fieldsToSave[field.id]})
                } else {
                    accum.push(field);
                }
                return accum;
            },[]);
            let newItems = items.reduce((accum, item) => {
                if(item.id === selected){
                    accum.push({...item, fields:updateFields});
                } else {
                    accum.push(item)
                }
                return accum;
            },[]);
            // save to next
            saveItem(newItems);
            setFields(updateFields)
        }).then(() => {
            showCount(count);
        }).catch(() => {});
    };

    useImperativeHandle(ref, () => ({
        handleCancel (count) {
            const updateFields = fields.reduce((accum, field) => {
                if(fieldsToSave[field.id]){
                    accum.push({...field, fieldValue: fieldsToSave[field.id]})
                } else {
                    accum.push(field);
                }
                return accum;
            },[]);
            setFields(updateFields)
        },
        handleSave(){
            onFieldsSave();
        }
    }));

    return(
        <div className="form-container">
            <form>
                <h2>{name}</h2>
                <div>
                    {
                        currFields.map((field, idx) => {
                          switch(field.fieldType) {
                            case CONSTANTS.TEXT:
                                return( <TextField key={idx} field={field} onBlur={onFieldAction}/> );
                            case CONSTANTS.OPTION:
                                return( <OptionField key={idx} field={field} onChange={onFieldAction}/> );
                            case CONSTANTS.TOGGLE:
                                return( <ToggleField key={idx} field={field} onChange={onFieldAction}/> );
                        }
                      })
                    }
                </div>
            </form>
            <div className={`change-counter ${show ? "" : "hidden"}`}>
                <span>{count} Items in History</span>
            </div>
        </div>
    )
});

export default FormContainer;