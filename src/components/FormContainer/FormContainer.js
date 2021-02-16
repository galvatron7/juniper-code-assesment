import React, {useContext, useEffect, useRef} from "react";
import ToggleField from "./Fields/ToggleField";
import TextField from "./Fields/TextField";
import OptionField from "./Fields/OptionField";
import * as CONSTANTS from "../../Constants";

const FormContainer = React.memo(({fields, name, selected, items, saveItem, setToPrevious}) =>  {

    const [currFields, setFields] = React.useState([]);
    const [fieldsToSave, setFieldsToSave] = React.useState({});

    useEffect(() => {
       setFields([...fields]);
    },[selected]);

    useEffect(() => {
        setFields([...fields]);
    },[items]);

    function onFieldAction (id, value) {
        setFieldsToSave({...fieldsToSave, [id]:value});
    }

    const onFieldsSave = (e) => {
        new Promise((resolve, reject) => {
            // preserve current
            setToPrevious(items);
            resolve();
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
        });
    };

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
                <button type="button" onClick={ onFieldsSave }>Save</button>
                </div>
            </form>
        </div>
    )
});

export default FormContainer;