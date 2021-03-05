import React from 'react';
import { connect } from 'react-redux';
import { usersDetail } from '../actions';
import { timing_valid, timing_invalid } from '../actions';

class Timer extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            count: 0
        }
    }

    TimingValidity= ()=>{
        this.props.timing_invalid();
    }

    renderinfo= ()=>{
        const {count}= this.state;
        if(count===0){
            clearInterval(this.myInterval);
            this.TimingValidity();
        }
    }

    convert= ()=>{
        var hr= parseInt(this.state.count/60)
        var min= parseInt(this.state.count%60)
        console.log(hr-1);
        console.log(min);
    }

    render(){
        this.renderinfo();
        var min= parseInt(this.state.count/60);
        var sec= this.state.count%60;
        return (
            <div>
                <h4 className="timer">Time Left: {min<10?`0${min}`:min} : {sec<10?`0${sec}`:sec}</h4>
            </div>
        );
    }

    componentDidMount(){
        this.props.timing_valid();
        this.setState({
            count: this.props.startCount
        });

        this.doIntervalChange();
    }

    doIntervalChange(){
        this.myInterval= setInterval(()=>{
            if(this.props.isSignedIn)
                this.setState( prevState => ({
                    count: prevState.count-1
                }));
        },1000);
    }

    componentWillUnmount(){
        clearInterval(this.myInterval);
    }
}

const mapStateToProps= (state)=>{
    return { 
        username:  state.auth.username,
        isSignedIn: state.auth.isSignedIn,
        valid: state.time.valid
    };
};

export default connect(mapStateToProps,{usersDetail, timing_valid, timing_invalid})(Timer);