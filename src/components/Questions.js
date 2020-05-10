import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { fetchQuestions } from '../actions';
import { usersDetail } from '../actions';
import Question from './Question';
import Timer from './Timer';

class Questions extends React.Component {
    constructor(props){
        super(props);
        this.state= {flag:0,count:0,check:true};
    }

    componentDidMount(){
        this.props.fetchQuestions();
    }

    onSubmit= async (formValues) => {
        console.log("he");
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
                    <button id="sub" className="ui button primary">Submit</button>
                </div>
            );      
    }

    render() {
        if(!this.props.validating && this.state.flag==0)
            document.getElementById("sub").click();
        
        return (
            <div>
                <h2>CESTA LOCKDOWN QUIZ</h2>
                <div className="ui celled list">
                    <div class="text-right">
                        <Timer startCount="10" />
                    </div>
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
    console.log("fs="+state.time.valid);
    return { 
        questions: Object.values(state.questions),
        username:  state.auth.username,
        isSignedIn: state.auth.isSignedIn,
        validating: state.time.valid
    };
};

const Form= reduxForm({
    form: 'fetch_questions',
    validate: validate
})(Questions);

export default connect(mapStateToProps,{fetchQuestions, usersDetail})(Form);