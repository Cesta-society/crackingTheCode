import React from 'react';
import { connect } from 'react-redux';
import ModalQuestion from './Modal';
import { fetchQuestions, deleteQuestion } from '../actions';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

class PageQuestion extends React.Component {

    componentDidMount() {
        this.props.fetchQuestions();
        console.log(this.props.params);
    }

    renderList(){
        var x=1;
        return this.props.questions.map( (ques) =>{
            return (
                <>
                    <div className="row">
                        <div className="col-4">
                          {x++}.{ques.q1}
                        </div>
                        <div className="col-4">
                            <Link to={`/admin/update/${ques._id}`}>
                                Edit
                            </Link>
                        </div>
                        <div className="col-4">
                            <ModalQuestion id={ques._id} op="Delete" title="Delete Question" />
                        </div>
                    </div>
                    <hr/>
                </>
            )
        });
    }

    render() {
        return (
            <div>
                <hr/>
                <br/><br/>
                <div className="text-right">
                    <button className="btn btn-primary" onClick={()=>window.location.replace('/admin/add')}>Add Question</button>
                </div>
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