import React,{useState, useEffect} from "react";

class TextField extends React.Component {
    // const [text, setText] = useState(field.fieldValue);

    constructor(props) {
        super(props);
        this.state = {
            fieldValue:""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onBlur(this.props.field.id, e.target.value);
        console.log(e.target.value);
        this.setState({fieldValue: e.target.value});
        console.log("PROPS: ", this.props);
        // setText(e.target.value);
    }

    render(){
        return (
            <div className="cluster">
                <label htmlFor={this.props.field.id}>{this.props.field.fieldName}</label>
                <input
                    type="text"
                    id={this.props.field.id}
                    name={this.props.field.id}
                    className="form-input"
                    value={this.state.fieldValue}
                    onChange={this.handleChange}/>
            </div>
        )
    }
};

export default TextField;