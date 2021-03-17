import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class QuestionForm extends React.Component {

    onSubmit= (formValues) => {
        console.log(formValues);
        this.props.onSubmit(formValues);
    }

    renderError= ({error, touched})=>{
        if(touched && error){
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }


    renderInput= (props)=>{
        const className= `field ${props.meta.error && props.meta.touched?'error':''} `;
        if(props.type!=='radio')
            return (
                <div className={className}>
                    {props.label}
                    {
                        props.label=="Add Question"?
                        <textarea style={{width:`${props.width}`}} {...props.input} type={props.type} autoComplete="off"/>:
                        <input style={{width:`${props.width}`}} {...props.input} type={props.type} autoComplete="off"/>
                    }
                    {this.renderError(props.meta)}
                </div>
            );
        else
            return (
                <div className={className}>
                    <input style={{width:`${props.width}`}} {...props.input} type={props.type} autoComplete="off"/>
                    {this.renderError(props.meta)}
                    <br/>
                </div>
            );     
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <div>
                    <Field name="q1" component={this.renderInput} label="Add Question" type="text" width='50vw'/>
                    <Field name="o1" component={this.renderInput} label="Statement 1:" type="text" width='50vw'/>
                    <Field name="o2" component={this.renderInput} label="Statement 2: " type="text" width='50vw'/>
                    <Field name="o3" component={this.renderInput} label="Statement 3: " type="text" width='50vw'/>
                    <Field name="o4" component={this.renderInput} label="Statement 4: " type="text" width='50vw'/>
                    <Field name="ans" component={this.renderInput} label="Answer: " type="text" value="D" width='5vw'/>
                    <button className="ui button primary">Submit</button>
                </div>
            </form>
        );
    }
}

const validate= (formValues) => {
    const errors= {};
    if(!formValues.q1)
        errors.q1= 'You must enter a Question';

    if(!formValues.o1)
        errors.o1= 'You must enter Option1';

    if(!formValues.o2)
        errors.o2= 'You must enter Option2';

    if(!formValues.o3)
        errors.o3= 'You must enter Option3';
    
    if(!formValues.o4)
        errors.o4= 'You must enter Option4';

    if(!formValues.ans)
        errors.ans= 'You must choose Correct Option';

    return errors;
}

export default reduxForm({
    form: 'question_form',
    validate: validate
})(QuestionForm);
