import React, {useState} from 'react';
import {Nav, NavbarText, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink} from 'reactstrap';

const NavMenu = () => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };
      

    return (
        <div>
        <Navbar
          color="light"
          expand="md"
          light
        >
          <NavbarBrand href="/">
            Weather Demo
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} />
          <Collapse navbar isOpen={!collapsed}>
            <Nav
              className="me-auto"
              navbar
            >
              <NavItem>
                <NavLink href="https://github.com/JoyfulReaper/ReactTesting/tree/master/weather">
                  GitHub
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://kgivler.com/">
                  Kyle's Home Page
                </NavLink>
              </NavItem>
            </Nav>
            <NavbarText>
              
            </NavbarText>
          </Collapse>
        </Navbar>
      </div>);
};

export default NavMenu;