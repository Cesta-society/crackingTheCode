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
            this.props.users
                .sort((a, b) => a.points > b.points ? -1 : 1)
                .map( (user) =>{
                return (
                    <div className="item" key={user.id}>
                        <div className="row">
                            <div className="col-4">
                                {++c}
                            </div>
                            <div className="col-4">
                                {user.user}
                            </div>
                            <div className="col-4">
                                {user.points}
                            </div>
                        </div>
                    </div>
                );
            })
        );
    }
}

const mapStateToProps= (state)=>{
    return { 
        users: Object.values(state.users),
    };
};

export default connect(mapStateToProps,{fetchUsers})(Users);