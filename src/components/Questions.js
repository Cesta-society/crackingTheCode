import React from 'react';
import { Field, reduxForm } from 'redux-form'

class Questions extends React.Component {

    onSubmit= (formValues) => {
        console.log(formValues);
    }

    renderInput= (props)=>{
        console.log(props);
        return (
            <>
                <br/>
                <input type={props.type} {...props.input} />
                {props.text}
            </>
        );
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div id="q1">
                    <label>Who is the Prime Minister of India?</label>
                    <Field name="sex" component={this.renderInput} text="Obama" type="radio" value="0"/>
                    <Field name="sex" component={this.renderInput} text="Modi" type="radio" value="1"/>
                    <Field name="sex" component={this.renderInput} text="Dodi" type="radio" value="0"/>
                    <Field name="sex" component={this.renderInput} text="Sodi" type="radio" value="0"/>
                </div>
            </form>
        );
    }
}