import React from 'react';
import { connect } from 'react-redux';
import ModalQuestion from './Modal';
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
                    <div className="content row">
                        <div className="col-4">
                            {ques.q1}
                        </div>
                        <div className="col-4">
                            <Link to={`/admin/update/${ques._id}`}>
                                Edit
                            </Link>
                        </div>
                        <div className="col-4">
                            <ModalQuestion value={ques._id} op="Delete" title="Delete Question" body={this.renderContent()} action={this.renderActions(ques._id)} />
                        </div>
                    </div>
                    <hr/>
                </div>
            )
        });
    }

    render() {
        return (
            <div>
                <hr/>
                <br/><br/>
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