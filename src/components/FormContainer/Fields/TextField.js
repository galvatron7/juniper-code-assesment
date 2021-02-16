import React,{useState, useEffect} from "react";

const TextField = ({field, onBlur}) => {
    const [text, setText] = useState(field.fieldValue);

    useEffect(() => {
            console.log("TEXT FIELD CHANGED", field.fieldValue);
            setText(field.fieldValue);
    },[field.fieldValue]);

    function handleChange(e) {
        onBlur(field.id, e.target.value);
        setText(e.target.value);
    }

    return (
        <div className="cluster">
            <label htmlFor={field.id}>{field.fieldName}</label>
            <input
                type="text"
                id={field.id}
                name={field.id}
                className="form-input"
                value={text}
                onChange={handleChange}/>
        </div>
    )
};

export default TextField;