import React from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import Test from './task/login';
import Index from './task/index';
import Page2 from './task/page2';
import Page3 from './task/page3';
import MenuList from './task/menu_list';
import SetMenu from './task/set_menu';
import SetModulePage from './task/set_module_page';
import EditMenu from './task/edit_menu';
import Upload from './task/upload';

export default class router  extends React.Component{
    render(){
        return(
            <Router>
                <div>
                    <Route exact path="/" component={ Test } />
                    <Route exact path="/index" component={ Index } />
                    <Route exact path="/page2" component={ Page2 } />
                    <Route exact path="/page3" component={ Page3 } />
                    <Route exact path="/menu_list" component={ MenuList } />
                    <Route exact path="/set_menu" component={ SetMenu } />
                    <Route exact path="/set_module_page" component={ SetModulePage } />
                    <Route exact path="/edit_menu" component={ EditMenu } />
                    <Route exact path="/upload" component={ Upload } />
                </div>
            </Router>
        );
    }
}
