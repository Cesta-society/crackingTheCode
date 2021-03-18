import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

class Users extends React.Component {

    componentDidMount(){
        this.props.fetchUsers();
    }

    render() {
        if(!this.props.users)
            return <div>Loading...</div>

        var c=0;
        
        return (
            <table style={{width:"100%",overflowX:'scroll'}}>
                <tr>
                    <th>S.No</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Points</th>
                    <th>Time</th>
                </tr>
                {this.props.users
                    .sort((a, b) => Number(a.points) > Number(b.points) ? -1 : 1)
                    .map( (user) =>{
                        var min= parseInt(user.time/60);
                        var sec= user.time%60;
                        return (
                        <tr>
                            <td>{++c}</td>
                            <td>{user.email}</td>
                            <td>{user.user}</td>
                            <td>{user.points}</td>
                            <td>{min<10?`0${min}`:min} : {sec<10?`0${sec}`:sec}</td>
                        </tr>
                        );
                    })
                }
            </table>
        );
    }
}

const mapStateToProps= (state)=>{
    return { 
        users: Object.values(state.users),
    };
};

export default connect(mapStateToProps,{fetchUsers})(Users);