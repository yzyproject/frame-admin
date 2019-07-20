import React from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import Test from './task/login';
import Index from './task/index';
export default class router  extends React.Component{
    render(){
        return(
            <Router>
                <div>
                    <Route exact path="/" component={ Test } />
                    <Route exact path="/index" component={ Index } />
                </div>
            </Router>
        );
    }
}
