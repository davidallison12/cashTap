import React, { Component } from 'react';
import {slide as MenuContainer } from 'react-burger-menu'
import Dashboard from './Dashboard';
import Menu from './Menu';


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <MenuContainer>
                <Menu />
            </MenuContainer>
         );
    }
}
 
export default Nav;