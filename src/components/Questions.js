import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { fetchQuestions } from '../actions';
import { usersDetail } from '../actions';
import Question from './Question';

class Questions extends React.Component {
    constructor(props){
        super(props);
        this.state= {flag:0,count:0};
    }

    componentDidMount(){
        this.props.fetchQuestions();
    }

    onSubmit= async (formValues) => {
        let c=0;
        await this.props.questions.map((question)=> {
            if(formValues[`ans${question.id}`]===question.ans)
                c++;
        });
        console.log(formValues);
        this.setState({count:c});
        this.props.usersDetail(this.props.username, this.state.count);
        this.setState({flag:1})
    }

    username= ()=> {

        if(!this.props.isSignedIn)
            return <div className="ui error message">No user Selected</div>

        return <>{this.props.username}</>
    }

    result = ()=> {
        if(!this.props.isSignedIn)
            return <></>;
        if(this.state.flag===1)
            return (
                <div>
                    <h5>You score {this.state.count} points.</h5>
                </div>
            );
        else
            return (
                <div>
                    <button className="ui button primary">Submit</button>
                </div>
            )
                
    }

    render() {
        return (
            <div>
                <h2>Arjit React Quiz</h2>
                <div className="ui celled list">
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                        <h4>User Name: {this.username()}</h4>
                        <Question />
                        {this.result()}
                    </form>
                </div>

            </div>
        );
    }
}

const validate= (formValues) => {
    const errors= {};
    if(!formValues.name)
        errors.name= 'You must enter a name'

    return errors;
}

const mapStateToProps= (state)=>{
    return { 
        questions: Object.values(state.questions),
        username:  state.auth.username,
        isSignedIn: state.auth.isSignedIn
    };
};

const Form= reduxForm({
    form: 'fetch_questions',
    validate: validate
})(Questions);

export default connect(mapStateToProps,{fetchQuestions, usersDetail})(Form);