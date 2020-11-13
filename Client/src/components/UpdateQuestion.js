import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchQuestion, updateQuestion } from '../actions';
import QuestionForm from './QuestionForm';

class UpdateQuestion extends React.Component {
    componentDidMount(){
        this.props.fetchQuestion(this.props.match.params.id);
    }

    onSubmit= (formValues)=> {
        this.props.updateQuestion(this.props.question._id,formValues);
    };

    render(){
        console.log(this.props.question);
        if(!this.props.question)
            return <div>Loading...</div>
        return (
            <div>
               <div className="text-center">
                    <h1>Update a Question</h1>
                </div>
                <br/>
               <QuestionForm initialValues={_.pick(this.props.question, 'q1','o1','o2','o3','o4','ans')} onSubmit={this.onSubmit} />
            </div>
        );
    }
}

const mapStateToProps= (state, ownProps)=>{
    return {question: state.questions[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{fetchQuestion, updateQuestion})(UpdateQuestion);