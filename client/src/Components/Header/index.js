import {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar,Container} from 'react-bootstrap'

import './index.css'

class Header extends Component{
    
    render(){
        return(
            <Container>
            <Navbar id="cont">
                <Container className="d-flex flex-row">
                    <Navbar.Brand>
                        <img 
                        src='https://res.cloudinary.com/gretakoutika0910/image/upload/v1622183960/TBP/vlogo_x30wje.gif' alt="logo"
                        width="150"
                        height="150"
                        className="d-inline-block align-text-top"/>
                    </Navbar.Brand>
                    <div className="collegeHeading d-flex flex-column">
                        <div><h3>Vasavi College of Engineering</h3></div>
                        <div>
                        <p>(Private Un-aided Non-minority Autonomous Institution)</p>
                        </div>
                        <div><h5>ACCREDITED BY NAAC WITH 'A++' GRADE </h5> </div>
                        <div><p>Affiliated to Osmania University and Approved by AICTE.</p></div>
                    </div>
                </Container>
            </Navbar>
            </Container>
        );
    }

}
export default Header;