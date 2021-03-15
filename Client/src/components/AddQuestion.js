import { Link } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { addQuestion } from '../actions';
import QuestionForm from './QuestionForm'

class AddQuestion extends React.Component {
  
    onSubmit= (formValues) => {
        console.log(formValues);
        this.props.addQuestion(formValues);
    }      

    render() {
        return (
            <>
                <div className="text-center">
                    <h1>Add a Question</h1>
                </div>
                <br/>
                <QuestionForm onSubmit={this.onSubmit} />
            </>
        );
    }
}


export default connect(null,{addQuestion})(AddQuestion);