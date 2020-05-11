import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import Header from './Header';
import Questions from './Questions';
import AddQuestion from './AddQuestion';
import DeleteQuestion from './DeleteQuestion';
import Results from './Results';
import history from '../history';

class App extends React.Component{
    //Switch deals with the problem associated with wildcard (:id) navigation

    render(){
        return (
            <div className="ui container">
                <Router history={history}>
                    <div>
                        <Header />
                        <Switch>

                            <Route path="/" exact={true} component= {Questions} />
                            <Route path="/admin/add" exact={true} component= {AddQuestion} />
                            <Route path="/admin/delete" exact={true} component= {DeleteQuestion} />
                            <Route path="/admin/results" exact={true} component= {Results} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
