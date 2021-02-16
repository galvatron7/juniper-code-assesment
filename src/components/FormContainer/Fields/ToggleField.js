import React, {useEffect, useState} from "react";

const ToggleField = ({field, onChange}) => {
    const [checked, setChecked] = useState(field.fieldValue);

    useEffect(() => {
        setChecked(field.fieldValue);
    });

    function handleChange(e) {
        onChange(field.id, e.target.checked);
        setChecked(e.target.checked);
    }

    return (
        <div className="cluster">
            <label htmlFor={field.id} className="chk-ctr">
                <input
                    type="checkbox"
                    id={field.id}
                    name={field.id}
                    className="form-checkbox"
                    checked={checked}
                    onChange={handleChange}/>
                <span className="checkmark">{field.fieldName}</span>
            </label>
        </div>
    )
};

export default ToggleField;