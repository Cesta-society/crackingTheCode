import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import { connect } from "react-redux";
import { reduxForm } from 'redux-form';
import Header from './Header';
import Questions from './Questions';
import AddQuestion from './AddQuestion';
import PageQuestion from './PageQuestion';
import UpdateQuestion from './UpdateQuestion';
import Results from './Results';
import history from '../history';
import {selectId} from '../actions';
import {setFullScreen} from '../actions';
import {fetchQuestions} from '../actions';
import  Modal from './Modal';

import 'semantic-ui-css/semantic.min.css'

class App extends React.Component{
    //Switch deals with the problem associated with wildcard (:id) navigation

    constructor(props) {
        super(props);
        this.state= {flag:0};
    }

    componentDidMount(){
        this.props.fetchQuestions();
        console.log(localStorage.getItem('x-time-token'));
        if(!localStorage.getItem('x-time-token') || !localStorage.getItem('x-time-token')==NaN  || localStorage.getItem('x-submit-token'))
            localStorage.setItem('x-time-token',1500);
    }

    render(){
        console.log(this.props);
        if(this.state.flag==0 && this.props.questions.length){
            console.log(this.props.questions);
            this.props.selectId(this.props.questions[0]._id,1)
            this.setState({flag:1});
        } 

        return (
            <div className="ui container fluid" style={{paddingBottom:'10vh'}}>
                <Router history={history}>
                    <div>
                        <Header />
                        <Switch>
                            <Route path="/" exact={true} component= {Questions} />
                            <Route path="/admin/add" exact={true} component= {AddQuestion} />
                            <Route path="/admin/page" component= {PageQuestion} />
                            <Route path="/admin/update/:id" exact={true} component= {UpdateQuestion} />
                            <Route path="/admin/results" exact={true} component= {Results} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
      isSignedIn: state.auth.isSignedIn,
      questions: Object.values(state.questions),
      isFullScreen: state.fullScreen.isFullScreen
    };
};




export default connect(mapStateToProps,{fetchQuestions,selectId,setFullScreen})(App);
