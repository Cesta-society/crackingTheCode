import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import Header from './Header';
import Questions from './Questions';
import AddQuestion from './AddQuestion';
import PageQuestion from './PageQuestion';
import UpdateQuestion from './UpdateQuestion';
import Results from './Results';
import history from '../history';

class App extends React.Component{
    //Switch deals with the problem associated with wildcard (:id) navigation

    render(){
        return (
            <div className="ui container" style={{paddingBottom:'10vh'}}>
                <Router history={history}>
                    <div>
                        <Header />
                        <Switch>

                            <Route path="/" exact={true} component= {Questions} />
                            <Route path="/admin/add" exact={true} component= {AddQuestion} />
                            <Route path="/admin/page" exact={true} component= {PageQuestion} />
                            <Route path="/admin/update/:id" exact={true} component= {UpdateQuestion} />
                            <Route path="/admin/results" exact={true} component= {Results} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
