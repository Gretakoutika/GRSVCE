import {Component} from 'react'
import Header from '../Header/index.js'

import {Link} from 'react-router-dom'
import { Navbar,Container,Nav,NavDropdown} from 'react-bootstrap'
import Cookies from 'js-cookie'
import './committee.css'
import AcademicDepartment from '../AcademicDepartment/index.js'


class Committee extends Component{
    onLogout =()=> {
        const {history} = this.props;
        Cookies.remove('jwt_token');
        history.replace('/');
        //window.location.replace("/");
        
      }

    constructor(props){
      super(props);
      this.state={
          showAlert:false,
          records:[],
          alertType:"Success",
          alertMsg:"",
          isLoading:true,
      }
    }
    render(){
    const { match } = this.props
    const { params } = match
    const { id } = params

    const {dept}=this.state;
    const urlCse=`/committee/${id}/CSE`;
    const urlEce=`/committee/${id}/ECE`;
    const urlEee=`/committee/${id}/EEE`;
    const urlIt=`/committee/${id}/IT`;
    const urlCivil=`/committee/${id}/Civil`;
    const urlMech=`/committee/${id}/MECH`;
    const urlHss=`/committee/${id}/HSS`;
    const urlFin=`/committee/${id}/Finance`;
    const urlAdmi=`/committee/${id}/Admissions`;
    const urlRag=`/committee/${id}/Ragging`;
        return(
            <>
            <Header />
            <Container>
            <Navbar id="nbar" bg="#2471a3" variant="#2471a3" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

                <Nav>
                <NavDropdown title="Academic" id="basic-nav-dropdown">
                    
                    <NavDropdown.Item href={urlEce}>ECE</NavDropdown.Item>
                    <NavDropdown.Item href={urlEee}>EEE</NavDropdown.Item>
                    <NavDropdown.Item href={urlIt}>IT</NavDropdown.Item>
                    <NavDropdown.Item href={urlCivil}>CIVIL</NavDropdown.Item>
                    <NavDropdown.Item href={urlMech}>MECH</NavDropdown.Item>
                    <NavDropdown.Item href={urlHss}>H&SS</NavDropdown.Item> 
                </NavDropdown>
                <NavDropdown title="Non Academic" id="basic-nav-dropdown">
                    <NavDropdown.Item href={urlAdmi}>Admissions</NavDropdown.Item>
                    <NavDropdown.Item href={urlRag}>Ragging</NavDropdown.Item>
                    <NavDropdown.Item href={urlFin}>Finance</NavDropdown.Item>     
                </NavDropdown>
                <Nav.Link onClick={this.onLogout} className='item'>Logout</Nav.Link>  
                </Nav>
            </Navbar.Collapse>
            </Navbar>
            <AcademicDepartment dept='CSE'/>
            </Container>
            </>)}
            
          }


export default Committee;
