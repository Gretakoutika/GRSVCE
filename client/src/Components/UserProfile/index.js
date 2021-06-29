import './userprofile.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link,Redirect} from 'react-router-dom';
import { Navbar,Container,Nav,NavDropdown,Table} from 'react-bootstrap'
import {Search} from 'react-bootstrap-icons'

import Header from '../Header/index.js'
import { Component } from 'react'



class UserProfile extends Component {
  
  
  state = { studentPendingComplaints:[], StudentSolvedComplaints: [], isLoading: true, complaint_type:"",searchInput:"",}
  componentWillMount() {
    this.getStudentPendingComplaintsData();
    this.getStudentSolvedComplaintsData();
  }
  

  

  getStudentPendingComplaintsData=async () => {
    const { match } = this.props;
    const { params } = match;
    const jwtToken=Cookies.get('jwt_token');
    const options={
      method:'GET',
      headers:{
        Authorization:`Bearer ${jwtToken}`
      }

    }
    const { id } = params;
    const url=`/students/${id}/complaints/?status=Pending`;
    const response = await fetch(url,options);
    const data = await response.json()
    //console.log(data);
    this.setState({ studentPendingComplaints: data, isLoading:false });
    
  }
  getStudentSolvedComplaintsData=async () => {
    const { match } = this.props
    const { params } = match
    const { id } = params
    const jwtToken=Cookies.get('jwt_token');
    const url=`/students/${id}/complaints/?status=Solved`;
    /*const options={
      method:'GET',
      headers:{
        Authorization:`Bearer ${jwtToken}`
      }

    }
    //proxy


    
    const response = await fetch(url,options)
    const data = await response.json()
    this.setState({ StudentSolvedComplaints: data, isLoading:false });*/


    fetch(url, {
      method: 'GET',
      mode:'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization:`Bearer ${jwtToken}`,
      }
    })
    .then(response => { return response.json();})
      .then(responseData=>{
        console.log(responseData);
        this.setState({ StudentSolvedComplaints: responseData, isLoading:false });
        return responseData;
      })
      .catch((error) => console.log("error",error));
    }
  
  
    onLogout =()=> {
      const {history} = this.props;
      Cookies.remove('jwt_token');
      history.replace('/');
      //window.location.replace("/");
      
    }
    onChangeSearchInput = (event) => {
      this.setState ({
        searchInput: event.target.value
      })
      }
  render(){

    const { isLoading,searchInput}=this.state;

    const { match } = this.props
    const { params } = match
    const { id } = params
  

    const url=`/students/${id}/nonacademic`;
    const url2=`/students/${id}/academic`;
    //const profileurl=`/students/${id}/profile/`;
   
    //console.log(profileurl);
    const count= this.state.studentPendingComplaints.length+this.state.StudentSolvedComplaints.length;
    const pending=this.state.studentPendingComplaints.length;
    const solved=this.state.StudentSolvedComplaints.length;
    const searchPendingResults=this.state.studentPendingComplaints.filter((comp)=>{
      return comp.DEPARTMENT.includes(searchInput);
    })
    const searchSolvedResults=this.state.StudentSolvedComplaints.filter((comp)=>{
      return comp.department.includes(searchInput);
    })
    const profileurl=`/students/${id}/profile/${pending}/${solved}/`;
  return (
    <div>
      <div>
      <Navbar expand="lg" variant="light" bg="light">
                <Container>
            <Navbar.Brand id='NB' href="#">STUDENTPROFILE</Navbar.Brand>
                </Container>
      </Navbar>
      </div>
    <Header/>
      
    <Container>
          
            <Navbar id="nbar"   expand="lg">
                
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <Nav> <a href="#pendingcomplaints" > Pending complaints </a></Nav>
                    <Nav> <a href="#solvedcomplaints" > Solved complaints </a></Nav>
                    
                    
                    <NavDropdown title="Raise complaint" id="basic-nav-dropdown">
                    <NavDropdown.Item href={url2}>Academic</NavDropdown.Item>
                        <NavDropdown.Item className="item"><Link params={{ totalComplaints: {count} }} to={url}> Non-Academic</Link></NavDropdown.Item>
                        
                    </NavDropdown>
                    <Nav><input id="searchbar" type="search" value={searchInput} className="mr-3" placeholder="Enter the department" onChange={this.onChangeSearchInput}/></Nav>
                   
                    <Nav> <a href={profileurl} className="item">My Profile </a> </Nav>
                    <Nav className="item" onClick={this.onLogout}>Logout</Nav>
                    
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    </Container>
    <Container className = "pendingcomplaint">
      <div id="pendingcomplaints">
        <h1>
        Pending Complaints
        </h1>
    
        <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ComplaintId</th>
            <th>Description</th>
            <th>Department</th>
            <th>Time</th>
            <th>Status</th>

          </tr>
        </thead>
        <tbody>
        
        {isLoading ? (
          <Loader type="ThreeDots" color="grey" height={50} width={50} />
        ) : (
                  searchPendingResults.map((complaint)=>{
                        return(
                          
                            <tr id="sc" key={complaint.COMPLAINT_ID}>
                              <td >{complaint.COMPLAINT_ID}</td>
                              <td>{complaint.COMPLAINT_DESC}</td>
                              <td>{complaint.DEPARTMENT}</td>
                              <td>{complaint.TIME}</td>
                              <td>{complaint.STATUS}</td>
                            </tr>
                        );
                  }))}
          </tbody>
      </Table>
      </div>
      
  </Container>
  <Container className = "solvedcomplaint">
      <div id="solvedcomplaints">
        <h1>
        Solved Complaints
        </h1>
    
        <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ComplaintId</th>
            <th>Department</th>
            <th>Complaint Description</th>
            <th>Solution Description</th>
            <th>Time</th>
            

          </tr>
        </thead>
        <tbody>
        
        {isLoading ? (
          <Loader type="ThreeDots" color="grey" height={50} width={50} />
        ) : (
                  searchSolvedResults.map((complaint)=>{
                        return(
                          
                            <tr id="sc" key={complaint.complaint_id}>
                              <td >{complaint.complaint_id}</td>
                              <td >{complaint.department}</td>
                              <td >{complaint.complaint_descp}</td>
                              <td>{complaint.solution_descp}</td>
                              <td>{complaint.solvedtime}</td>
                              
                            </tr>
                        );
                  }))}
          </tbody>
      </Table>
      </div>
      
  </Container>
  
    </div>

  )
  }
}
export default UserProfile