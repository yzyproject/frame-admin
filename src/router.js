import React from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import Test from './task/login';
import Index from './task/index';
import Page2 from './task/page2';
import Page3 from './task/page3';
import SetMenu from './task/set_menu';
export default class router  extends React.Component{
    render(){
        return(
            <Router>
                <div>
                    <Route exact path="/" component={ Test } />
                    <Route exact path="/index" component={ Index } />
                    <Route exact path="/page2" component={ Page2 } />
                    <Route exact path="/page3" component={ Page3 } />
                    <Route exact path="/set_menu" component={ SetMenu } />
                </div>
            </Router>
        );
    }
}
