import React, { Component} from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';
import { NavLink} from 'react-router-dom';


// const serverURL = "http://localhost:5000";

class Header extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            isNavOpen: false,
            show: true
        };
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
    });
    }

    componentDidMount(){
        if(this.props.show === "false")
            this.setState({show: false})
    }
    
    render() {
        
        return(
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container ml-4"> 
                        <NavbarToggler onClick={this.toggleNav} />
                        {/* <img src='images/log.jpg' height="70" width="70" /> */}
                        <NavbarBrand  href="/" style={{fontWeight:'bold', fontSize:35}}> HireY</NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav className="m-auto" navbar>
                                <NavItem className="ml-4">
                                    <NavLink className="nav-link "  to='/'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                                </NavItem>
                                <NavItem  className="ml-5">
                                    <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                                </NavItem>
                                <NavItem  className="ml-5 ">
                                    <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                {this.state.show !== false ?
                    <Jumbotron className="rounded-0">
                        <div className="container mb-5">
                            <div className="row row-header">
                                <div className="col-12 col-m-6">
                                    <h1>Mock Interview System </h1>
                                    <p className="ml-4 mt-4">An automated Mock Interview System to Test for a job dream, Your Perfect Career Guide </p>
                                </div>
                            </div>
                        </div>
                    </Jumbotron> : null
                }

            </React.Fragment>
        );
    }
}
export default Header;
