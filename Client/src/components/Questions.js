import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import Grid from '@material-ui/core/Grid';

import { selectId } from "../actions";
import { fetchQuestions } from '../actions';
import { usersDetail } from '../actions';
import Question from './Question';
import Timer from './Timer';
import Card from './Card';
import ModalUI from './ModalUI';
import Alert from './Alert';


class Questions extends React.Component {
    constructor(props){
        super(props);
        this.state= {flag:0,count:0,check:true,screenWidth:window.innerWidth};
    }

    componentDidMount(){
        this.props.fetchQuestions();
    }

    onSubmit= async (formValues) => {
        let c=0;
        await Object.values(this.props.questions).map((question)=> {
            if(formValues[`ans${question._id}`]===question.ans.toLowerCase())
                c++;
        });
        console.log(formValues);
        this.setState({count:c});
        this.props.usersDetail(this.props.username, this.props.email, this.state.count, 1500-parseInt(this.props.timeValue));
        this.setState({flag:1})
        document.getElementById('alert').click();
        localStorage.setItem('x-submit-token', '100002123#12231#123');
        localStorage.removeItem("x-time-token");
    }

    username= ()=> {
        if(!this.props.isSignedIn) 
            return <div className="ui error message">No user Selected</div>

        return <>{this.props.username}</>
    } 

    result = ()=> {
        if(!this.props.isSignedIn)
            return <></>;
        if(localStorage.getItem('x-submit-token'))
            return (
                <div className="question-submit">
                    <h5 className="main-question">You submitted your quiz.</h5>
                </div>
            );
        else
            return (
                <div className="question-submit">
                    <ModalUI onSubmit={this.props.handleSubmit(this.onSubmit)}/>
                    <button id='sub' type="submit" style={{visibility:'hidden'}}/>
                </div>
            );      
    }

    onClick=(index)=>{
        this.props.selectId(Object.values(this.props.questions)[index-1]._id,index);
        console.log(`Clicked on ${Object.values(this.props.questions)[index-1]._id}`);
        console.log(Object.values(this.props.questions)[index-1]._id);
    }

    render() {
        if(!this.props.questions)
            return <>Loading...</>;

        if(!this.props.validating && this.state.flag===0)
            document.getElementById('sub').click();

        window.addEventListener("resize", ()=>this.setState({screenWidth:window.innerWidth}));
        
        var x=1;

        console.log();
        
        return (
            <div>
                <h1 className="Quiz-title text-center">CESTA <br /> WARM-UP <br /> QUIZ</h1>
                <div className="ui celled list">
                    <hr />
                    <div className="text-right">
                        <Timer startCount={localStorage.getItem('x-time-token')?localStorage.getItem('x-time-token'):1500}/>
                    </div>
                    <Alert />
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                        <h4 className="userName">USER :-   {this.username()}</h4>
                        <hr size="10"/>
                        { this.props.isSignedIn && (
                            <Grid container spacing={3}>
                                <Grid item sm={3} xs={3} style={{height: '35vh',overflowY: 'scroll' }}>
                                    <Grid container spacing={2}> 
                                    {
                                        Object.values(this.props.questions).map((item)=>{
                                            return (
                                                <Grid item>
                                                    <Card sno={x++} question={item}/>
                                                </Grid>
                                            )
                                        })
                                    }
                                    </Grid>
                                </Grid>
                                <Grid item sm={9} xs={9} >
                                    <Grid container spacing={1}>
                                        <Grid item xs={1} style={{marginTop:'15vh'}}>
                                            <ArrowBackIosRoundedIcon fontSize="large" color={this.props.selectedId.sno==1?'disabled':''} onClick={()=>this.props.selectedId.sno==1?null:this.onClick(this.props.selectedId.sno-1)}/>
                                        </Grid>
                                        <Grid item xs={10} >
                                            <Question sno={this.props.selectedId.sno} question={this.props.questions[this.props.selectedId.id]}/>
                                        </Grid>
                                        <Grid item xs={1} style={{marginTop:'15vh'}}>
                                            <ArrowForwardIosRoundedIcon fontSize="large" color={this.props.selectedId.sno==Object.values(this.props.questions).length?'disabled':''} onClick={()=>this.props.selectedId.sno==Object.values(this.props.questions).length?null:this.onClick(this.props.selectedId.sno+1)}/>
                                        </Grid>
                                    </Grid> 
                                </Grid>
                            </Grid>
                        )}
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
        questions: state.questions,
        username:  state.auth.username,
        email: state.auth.email,
        isSignedIn: state.auth.isSignedIn,
        validating: state.time.valid,
        selectedId: state.selectedId,
        timeValue: state.time.value
    };
};

const Form= reduxForm({
    form: 'fetch_questions',
    validate: validate
})(Questions);

export default connect(mapStateToProps,{fetchQuestions, usersDetail,selectId})(Form);
