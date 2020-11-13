import React from 'react';
import { connect } from 'react-redux';
import ModalQuestion from './ModalQuestion';
import { fetchQuestions, deleteQuestion } from '../actions';
import { Link } from "react-router-dom";

class PageQuestion extends React.Component {

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
                <div className="item" key={ques._id}>
                    <i className="large middle aligned icon camera" />
                    <div className="content row">
                        <div className="col-4">
                            {ques.q1}
                        </div>
                        <div className="col-4">
                            <Link to={`/admin/update/${ques.id}`}>
                                Edit
                            </Link>
                        </div>
                        <div className="col-4">
                            <ModalQuestion value={ques.id} op="Delete" title="Delete Question" body={this.renderContent()} action={this.renderActions(ques.id)} />
                        </div>
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

export default connect(mapStateToProps, { fetchQuestions, deleteQuestion })(PageQuestion);