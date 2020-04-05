import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import Header from './Header';
import Questions from './Questions';
import AddQuestion from './AddQuestion';
import history from '../history';

const App= ()=>{
    //Switch deals with the problem associated with wildcard (:id) navigation
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact={true} component= {Questions} />
                        <Route path="/admin" exact={true} component= {AddQuestion} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
