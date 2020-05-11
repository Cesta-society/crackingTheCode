import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { fetchQuestions } from '../actions';

class Question extends React.Component {
    constructor(props){
        super(props);
        this.state= {id:1};
    }

    componentDidMount(){
        this.props.fetchQuestions();
    }

    renderInput= (props)=>{
        return (
            <div className="field">
                <input style={{width:`${props.width}`}} {...props.input} type={props.type} autoComplete="off"/>
                {props.option}
                <br/>
            </div>
        );   
    }

    renderQuestion = ()=> {
        if(!this.props.question[`${this.state.id}`])
            return <div>Loading...</div>

        let name= "ans"+this.props.question[`${this.state.id}`].id
        return (
            <div className="item" key={this.props.question[`${this.state.id}`].id}>
                <i className="large middle aligned icon camera" />
                <div className="content">
                    <div id="question">
                        <h3>{this.props.question[`${this.state.id}`].q1}</h3><br/>
                    </div>
                    <div>
                        <Field name={name} component={this.renderInput} type="radio" value="A" width='5vw' option={this.props.question[`${this.state.id}`].o1}/>
                        <Field name={name} component={this.renderInput} type="radio" value="B" width='5vw' option={this.props.question[`${this.state.id}`].o2}/>
                        <Field name={name} component={this.renderInput} type="radio" value="C" width='5vw' option={this.props.question[`${this.state.id}`].o3}/>
                        <Field name={name} component={this.renderInput} type="radio" value="D" width='5vw' option={this.props.question[`${this.state.id}`].o4}/>
                        <br/>
                    </div>
                </div>
            </div>
        );
    }

    Card= ()=>{
        let questions= Object.values(this.props.question);
        let c=0;
        return questions.map((question)=> {
            this.flag= question.id;
            if(question.id===this.state.id)
                this.color= 'green';
            else
                this.color= 'red';

            return (
                <Link to="" className="col-2" key={question.id}>
                    <div onClick={()=> this.onClick(question.id)} style={{backgroundColor:`${this.color}`,height:'5vh',width:'5vw'}} className="ui small button test ad" data-text={++c}></div>
                </Link>
            );
        });
    }

    Column= (label,id) =>{
        console.log(label+" ID="+ id);
        if(id===0 || id===this.flag+1)
            return <div className="col-2"></div>
        
        return (
            <Link to="" className="col-2">
                <h5 onClick={() => this.onClick(id)}>
                    {label}  
                </h5>
            </Link>
        )
    }

    onClick= (id)=>{
        console.log("Current ID="+ id);
        this.setState({id: id})
    }

    render() {
        return (
            <div>
                {this.renderQuestion()}
                <div className="row">
                    {this.Column('Prev', this.state.id-1)}
                    {this.Column('Next', this.state.id+1)}
                </div>
                <br/><br/>
                <div className="row">
                    {this.Card()}
                </div>
                <br/>
            </div>
        );
    }
}

const mapStateToProps= (state)=>{
    return { 
        question: state.questions,
    };
};

export default connect(mapStateToProps,{fetchQuestions})(Question);