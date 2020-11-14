import React from "react";
import { connect } from "react-redux";
import { Field } from "redux-form";
import { Link } from "react-router-dom";
import { fetchQuestions } from "../actions";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: 1 };
  }

  componentDidMount() {
    this.props.fetchQuestions();
  }

  renderInput = (props) => {
    console.log(props);
    return (
      <div className="field">
        <input
          style={{ width: `${props.width}` }}
          {...props.input}
          type={props.type}
          autoComplete="off"
        />
        <a className="option">{props.option}</a>
        <br />
      </div>
    );
  };

  renderQuestion = () => {
    if (!this.props.question[`${this.state.id}`]) 
      return <div>Loading...</div>;

    let name = "ans" + this.props.question[`${this.state.id}`].id;
    return (
      <div className="item" key={this.props.question[`${this.state.id}`].id}>
        {/* <i className="large middle aligned icon question" /> */}
        <div className="content">
          <div id="question">
            <h4 className="main-question">
              Q{this.state.id}.  {this.props.question[`${this.state.id}`].q1} 
            </h4>
            <br />
          </div>
          <div>
            <b>
              <Field
                name={name}
                component={this.renderInput}
                type="radio"
                value="A"
                width="5vw"
                option={this.props.question[`${this.state.id}`].o1}
              />
              <Field
                name={name}
                component={this.renderInput}
                type="radio"
                value="B"
                width="5vw"
                option={this.props.question[`${this.state.id}`].o2}
              />
              <Field
                name={name}
                component={this.renderInput}
                type="radio"
                value="C"
                width="5vw"
                option={this.props.question[`${this.state.id}`].o3}
              />
              <Field
                name={name}
                component={this.renderInput}
                type="radio"
                value="D"
                width="5vw"
                option={this.props.question[`${this.state.id}`].o4}
              />
            </b>
            <br />
          </div>
        </div>
      </div>
    );
  };

  Card = () => {
    let questions = Object.values(this.props.question);
    let c = 0;
    return questions.map((question) => {
      this.flag = question.id;
      if (question.id === this.state.id) 
        this.color = "#1ac969";
      else 
        this.color = "#f01f53";

      return (
        <Link to="" className="col-3" key={question.id}>
          <div
            onClick={() => this.onClick(question.id)}
            style={{
              marginRight: "19px",
              marginTop: "10px",  
              backgroundColor: `${this.color}`,
              height: "5vh",
              width: "4vw",
            }}
            className="ui small button test ad"
            data-text={++c}
          ></div>
        </Link>
      );
    });
  };

  Column = (label, id) => {
    console.log(label + " ID=" + id);
    if (id === 0 || id === this.flag + 1) return <div className="col-6 direction"></div>;

    return (
      <Link to="" className="col-6 direction">
        <h5 onClick={() => this.onClick(id)}>{label}</h5>
      </Link>
    );
  };

  onClick = (id) => {
    console.log("Current ID=" + id);
    this.setState({ id: id });
  };

  render() {
    if(!this.props.isSignedIn)
      return <></>;
      
    return (
      <div className="row">
        <div className="col-sm-3">
          <div className="row text-left">{this.Card()}</div>
        </div>
        <div className="col-sm-9 text-center">
          {this.renderQuestion()}
          <div className="row">
            {this.Column("Prev", this.state.id - 1)}
            {this.Column("Next", this.state.id + 1)}
          </div>
        </div>
        <br />
        <br />
        
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    question: state.questions,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { fetchQuestions })(Question);
