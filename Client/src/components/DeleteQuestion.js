import React from 'react';
import { connect } from 'react-redux';
import FormQuestion from './FormQuestion';
import { fetchQuestions, deleteQuestion } from '../actions';

class DeleteQuestion extends React.Component {

    componentDidMount() {
        this.props.fetchQuestions();
        console.log(this.props.params);
    }

    renderActions(id){
        return (
            <React.Fragment>
                 <button onClick={()=> this.props.deleteQuestion(id)} className="ui button negative">Delete</button>
                <button type="button" className="btn btn-primary"  data-dismiss="modal">Cancel</button>
            </React.Fragment>
        );
    }

    renderContent() {
        return `Are you want to delete the stream`;
    }

    renderList(){
       return this.props.questions.map( (ques) =>{
            return (
                <div className="item" key={ques.id}>
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        {ques.q1}
                        <FormQuestion value={ques.id} op="Delete" title="Delete Question" body={this.renderContent()} action={this.renderActions(ques.id)} />
                    </div>
                </div>
            )
        });
    }

    render() {
        return (
            <div>
                {this.renderList()}
            </div>
        );
    }
}

const mapStateToProps= (state, ownProps)=> {
    console.log(state.questions[ownProps.match.params.id]);
    return {
        questions: Object.values(state.questions),
        question: state.questions[ownProps.match.params.id]
    }  
}

export default connect(mapStateToProps, { fetchQuestions, deleteQuestion })(DeleteQuestion);