import React, {useContext, useEffect, useRef} from "react";
import ToggleField from "./Fields/ToggleField";
import TextField from "./Fields/TextField";
import OptionField from "./Fields/OptionField";
import * as CONSTANTS from "../../Constants";

// // Hook
// function usePrevious(value, callback) {
//     const prevValues = useRef(value);
//     useEffect(() => {
//         callback(prevValues.current);
//         return () => (prevValues.current = value);
//     }, [value, callback]); // Only re-run if value changes
// }


const FormContainer = React.memo(({fields, name, selected, items, saveItem}) =>  {

    const [currFields, setFields] = React.useState([]);

    const prevValues = useRef();


    useEffect(() => {
        console.log("called!!");
       setFields([...fields]);
    },[selected]);

    useEffect(() => {
        console.log("ljljlkjlkjlkjl");
    },[items]);

    function onFieldAction (id, value) {
        const updateFields = fields.reduce((accum, field) => {
            if(field.id == id){
                field.fieldValue = value;
                accum.push({...field, fieldValue:value})
            } else {
                accum.push(field);
            }
            return accum;
         },[]);
        // updateFields[currField].fieldValue = value;
        setFields(updateFields);
    }

    const onFieldsSave = (e) => {
        saveItem(items);
    };

    return(
        <div className="form-container">
            <h2>{name}</h2>
            <form>
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
            </form>
        </div>
    )
});

export default FormContainer;