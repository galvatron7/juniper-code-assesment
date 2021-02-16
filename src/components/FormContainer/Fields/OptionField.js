import React,{useState, useEffect} from "react";

const OptionField = ({field, onChange}) => {
    const {fieldOptions} = field;
    const [selectedOption, setSelectedOption] = useState(field.fieldValue);

    useEffect(() => {
        setSelectedOption(field.fieldValue);
    });

    function handleChange(e) {
        onChange(field.id, e.target.value);
        setSelectedOption(e.target.value);
    }

    return (
        <div className="cluster">
            <label htmlFor={field.id}>{field.fieldName}</label>
            <select
                id={field.id}
                name={field.id}
                onChange={handleChange}
                value={selectedOption}
            >
            {
                fieldOptions.map((opt, idx) =>
                    <option key={opt.optionValue} value={opt.optionValue}>
                        {opt.optionName}
                    </option>
                )
            }
            </select>
        </div>
    )
};

export default OptionField;