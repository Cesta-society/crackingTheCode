import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { addQuestion } from '../actions';

class AddQuestion extends React.Component {
    constructor(props){
        super(props); 
        this.state= {ques:'',o1:'',o2:'',o3:'',o4:'',ans:''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log(this.state.ques);
        if(event.target.name=='q1')
            this.setState({ques: event.target.value});
        else if(event.target.name=='o1')
            this.setState({o1: event.target.value});
        else if(event.target.name=='o2')
            this.setState({o2: event.target.value});
        else if(event.target.name=='o3')
            this.setState({o3: event.target.value});
        else if(event.target.name=='o4')
            this.setState({o4: event.target.value});
        else
            this.setState({ans: event.target.value})
    }

    onSubmit= (formValues) => {
        console.log(formValues);
        this.props.addQuestion(formValues);
    }

    renderInput= (props)=>{
        console.log(props);
        props.input.value= props.val
        props.input.checked= props.checked
        if(props.type!='radio')
            return (
                <>
                    <br/>
                    {props.label}
                    <input style={{width:`${props.width}`}} {...props.input} type={props.type} onChange={this.handleChange} autoComplete="off"/>
                </>
            );
        else
            return (
                <>
                    <input style={{width:`${props.width}`}} {...props.input} type={props.type} onChange={this.handleChange} autoComplete="off"/>
                </>
            );     
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div id="q1">
                    <Field name="q1" component={this.renderInput} label="Add Question" type="text" val={this.state.ques} width='50vw'/>
                    <Field name="o1" component={this.renderInput} label="Option1" type="text" val={this.state.o1}  width='50vw'/>
                    <Field name="ans" component={this.renderInput} type="radio" checked={this.state.ans == 'A'} val="A" width='5vw'/>
                    <Field name="o2" component={this.renderInput} label="Option2" type="text" val={this.state.o2}  width='50vw'/>
                    <Field name="ans" component={this.renderInput} type="radio" checked={this.state.ans == 'B'} val="B" width='5vw'/>
                    <Field name="o3" component={this.renderInput} label="Option3" type="text" val={this.state.o3}  width='50vw'/>
                    <Field name="ans" component={this.renderInput} type="radio" checked={this.state.ans == 'C'} val="C" width='5vw'/>
                    <Field name="o4" component={this.renderInput} label="Option4" type="text" val={this.state.o4}  width='50vw'/>
                    <Field name="ans" component={this.renderInput} type="radio" checked={this.state.ans == 'D'} val="D" width='5vw'/>
                    <button className="ui button primary">Submit</button>
                </div>
            </form>
        );
    }
}

const Form= reduxForm({
    form: 'add_question',
})(AddQuestion);

export default connect(null,{addQuestion})(Form);