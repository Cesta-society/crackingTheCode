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
        if(count==0){
            clearInterval(this.myInterval);
            this.TimingValidity();
        }
    }

    render(){
        {this.renderinfo()}
        return (
            <div>
                <h4>Time Left: {this.state.count}s</h4>
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