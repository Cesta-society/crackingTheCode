import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount(){
        window.gapi.load('client:auth2', ()=>{
            window.gapi.client.init({
                clientId: '483980907306-p3rddblab189gcf77b4bemojmlt487jj.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=> {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange= (isSignedIn)=>{
        const user= this.auth.currentUser.get();
        console.log(user);
        if(isSignedIn)
            this.props.signIn({name:user.Qt.Ad, email:user.Qt.zu, Id: user.getId()});
        else
            this.props.signOut();
    }

    onSignInClick= ()=> {
        this.auth.signIn();
    }

    onSignOutClick= ()=> {
        this.auth.signOut();
    }

    renderAuthButton(){

        if(this.props.isSignedIn=== null)
            return null;
        else if(this.props.isSignedIn)
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                        Sign Out
                </button>   
            );
        else
            return (
                
                <button  onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                        Sign In Google
                </button>   
            );
    }

    render(){
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}

const mapStateToProps= (state)=>{
    return {isSignedIn: state.auth.isSignedIn};
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);