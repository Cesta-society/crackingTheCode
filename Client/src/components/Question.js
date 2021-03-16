import React from "react";
import { connect } from "react-redux";
import { Field } from "redux-form";
import { Link } from "react-router-dom";
import { fetchQuestions } from "../actions";

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchQuestions();
  }

  renderInput = (props) => {
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
    if (!this.props.question) 
      return <div>Loading...</div>;

    let name = "ans" + this.props.question._id;
    return (
      <div className="item" key={this.props.seq}>
        {/* <i className="large middle aligned icon question" /> */}
        <div className="content">
          <div id="question">
            <h4 className="main-question" >
              <pre style={{whiteSpace: "pre-wrap"}}>Q{this.props.sno}.  {this.props.question.q1}</pre>
            </h4>
            <br />
          </div>
          <div>
            <b>
              <Field
                name={name}
                component={this.renderInput}
                type="text"
                width="5vw"
              />
            </b>
            <br />
          </div>
        </div>
      </div>
    );
  };

 

  render() {
    if(!this.props.isSignedIn)
      return <></>;
      
    return (
      <>
        <div className="col-sm-9">
          {this.renderQuestion()}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { fetchQuestions })(Question);
