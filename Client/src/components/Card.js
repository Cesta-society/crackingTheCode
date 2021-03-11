import React from "react";
import { connect } from "react-redux";
import { Field } from "redux-form";
import { Link } from "react-router-dom";
import { fetchQuestions } from "../actions";
import { selectId } from "../actions";

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchQuestions();
  }

  onClick=(e)=>{
      this.props.selectId(this.props.question._id,this.props.sno);
      console.log(`Clicked on ${this.props.question._id}`);
  }

  render(){

    return (
        <div onClick={this.onClick} style={{width: '40px',height: '30px', backgroundColor: this.props.question._id==this.props.selectedId.id?'green':'white',border: '1px solid gray',borderRadius:'7px'}}>
            <h6 style={{cursor:'pointer',paddingTop:'5px',paddingLeft:'10px',color: this.props.question._id==this.props.selectedId.id?'white':'black'}}>
                {this.props.sno}
            </h6>
        </div>
    )
  }
}


  const mapStateToProps = (state) => {
    return {
      isSignedIn: state.auth.isSignedIn,
      selectedId: state.selectedId
    };
  };
  
  export default connect(mapStateToProps, { fetchQuestions,selectId })(Card);