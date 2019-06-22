import React from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import Test from './task/test';
export default class router  extends React.Component{
    render(){
        return(
            <Router>
                <div>
                    <Route exact path="/" component={ Test } />
                </div>
            </Router>
        );
    }
}
