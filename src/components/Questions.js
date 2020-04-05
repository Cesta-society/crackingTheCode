import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchQuestions } from '../actions';
import { usersDetail } from '../actions';

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
        this.props.usersDetail(formValues.name, this.state.count);
        this.setState({flag:1})
    }

    result = ()=> {
        if(this.state.flag==1)
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

    renderError= ({error, touched})=>{
        if(touched && error){
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }


    renderInput= (props)=>{
        console.log(props);
        const className= `field ${props.meta.error && props.meta.touched?'error':''} `;
        if(props.type==='radio')
            return (
                <div>
                    <input style={{width:`${props.width}`}} {...props.input} type={props.type} autoComplete="off"/>
                    {props.option}
                    <br/>
                </div>
            );   
        else
            return (
                <div className={className}>
                    <label>{props.label}</label><br/>
                    <input style={{width:`${props.width}`}} {...props.input} type={props.type} autoComplete="off"/>
                    {this.renderError(props.meta)}
                    <br/>
                </div>
            );
    }


    renderList(){
        return this.props.questions.map( (question) =>{
            let name= "ans"+question.id
            return (
                <div className="item" key={question.id}>
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <div id="question">
                            {question.q1}<br/>
                        </div>
                        <div>
                            <Field name={name} component={this.renderInput} type="radio" value="A" width='5vw' option={question.o1}/>
                            <Field name={name} component={this.renderInput} type="radio" value="B" width='5vw' option={question.o2}/>
                            <Field name={name} component={this.renderInput} type="radio" value="C" width='5vw' option={question.o3}/>
                            <Field name={name} component={this.renderInput} type="radio" value="D" width='5vw' option={question.o4}/>
                        <br/>
                        </div>
                    </div>
                </div>
            );
        })
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                        <Field name='name' component={this.renderInput} label="User Name" width='50vw'/>
                        {this.renderList()}
                        {this.result()}   
                    </form>
                </div>

            </div>
        );
    }
}

const validate= (formValues) => {
    console.log(formValues);
    const errors= {};
    if(!formValues.name)
        errors.name= 'You must enter a name'

    return errors;
}

const mapStateToProps= (state)=>{
    return { 
        questions: Object.values(state.questions)
    };
};

const Form= reduxForm({
    form: 'fetch_questions',
    validate: validate
})(Questions);

export default connect(mapStateToProps,{fetchQuestions, usersDetail})(Form);