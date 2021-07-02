import './Lecturer.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie';
import Loader from 'react-loader-spinner'
import { Navbar,Container,Nav,NavDropdown,Table,Button} from 'react-bootstrap'
import Header from '../Header/index.js'
import { Component } from 'react'

class Lecturer extends Component {
  
  
  state = { recievedComplaints:[], solvedComplaints: [], isLoading: true, complaint_type:"",  newInfoModal:false, searchInput:""}
  componentWillMount() {
    //this.getStudentData();
    this.recievedComplaintsData();
    this.solvedComplaintsData();
  }

  onLogout =()=> {
    const {history} = this.props;
    Cookies.remove('jwt_token');
    history.replace('/');
    //window.location.replace("/");
    
  }
  recievedComplaintsData=async () => {
    const { match } = this.props
    const { params } = match
    const { id } = params
    const jwtToken=Cookies.get('jwt_token');
    const options={
      method:'GET',
      headers:{
        Authorization:`Bearer ${jwtToken}`
      }

    }
    const url=`/faculty/${id}/complaints/?status=Pending`;
    const response = await fetch(url,options)
    const data = await response.json()
    //console.log(data);
    this.setState({ recievedComplaints: data, isLoading:false });
    
  }
  solvedComplaintsData=async () => {
    const { match } = this.props
    const { params } = match
    const { id } = params
    const jwtToken=Cookies.get('jwt_token');
    const options={
      method:'GET',
      headers:{
        Authorization:`Bearer ${jwtToken}`
      }

    }
    const url=`/faculty/${id}/complaints/?status=Solved`;
    const response = await fetch(url,options)
    const data = await response.json()
  
    this.setState({ solvedComplaints: data, isLoading:false });
    
  }

  onChangeSearchInput = (event) => {
    this.setState ({
      searchInput: event.target.value
    })
    }

    
  render()
  {
    const { isLoading,searchInput}=this.state;
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const receivedResults=this.state.recievedComplaints.filter((comp)=>{

      return comp.COMPLAINT_DESC.includes(searchInput);
    })
    const solvedResults=this.state.solvedComplaints.filter((comp)=>{
      return comp.COMPLAINT_DESC.includes(searchInput);
    })
    

    const pending=this.state.recievedComplaints.length;
    const solved=this.state.solvedComplaints.length;
    const profileurl=`/faculty/${id}/profile/${pending}/${solved}/`;
  return (
    
    <div>
      <div>
      <Navbar expand="lg" variant="light" bg="light">
                <Container>
            <Navbar.Brand id='NB' href="#">FACULTYPROFILE</Navbar.Brand>
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
                    <Nav><input type="search" value={searchInput} placeholder="Enter any keyword in Grievence Description" onChange={this.onChangeSearchInput}/></Nav>
                   
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
            <th>StudentId</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Description</th>
            <th>Time</th>
            <th>Status</th>
            <th>Solve</th>

          </tr>
        </thead>
        <tbody>
        
        {isLoading ? (
          <Loader type="ThreeDots" color="grey" height={50} width={50} />
        ) : (
                  receivedResults.map((complaint)=>{
                    const compUrl=`${id}/${complaint.COMPLAINT_ID}/solve`
                        return(
                          
                            <tr id="sc" key={complaint.COMPLAINT_ID}>
                              <td >{complaint.COMPLAINT_ID}</td>
                              <td>{complaint.STUDENT_ID}</td>
                              <td>{complaint.FIRST_NAME}</td>
                              <td>{complaint.LAST_NAME}</td>
                              <td>{complaint.COMPLAINT_DESC}</td>
                              <td>{complaint.TIME}</td>
                              <td>{complaint.STATUS}</td>
                              <td><Button href={compUrl}>Solve</Button></td>
                            </tr>
                        );
                  }))}
          </tbody>
      </Table>
      </div>
      </Container>

      <Container className = "pendingcomplaint">
      <div id="solvedcomplaints">
        <h1>
        Solved Complaints
        </h1>
    
        <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ComplaintId</th>
            <th>StudentId</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Description</th>
            <th>Time</th>
            <th>Status</th>
           

          </tr>
        </thead>
        <tbody>
        
        {isLoading ? (
          <Loader type="ThreeDots" color="grey" height={50} width={50} />
        ) : (
          solvedResults.map((complaint)=>{
                    
                        return(
                          
                            <tr id="sc" key={complaint.COMPLAINT_ID}>
                              <td >{complaint.COMPLAINT_ID}</td>
                              <td>{complaint.STUDENT_ID}</td>
                              <td>{complaint.FIRST_NAME}</td>
                              <td>{complaint.LAST_NAME}</td>
                              <td>{complaint.COMPLAINT_DESC}</td>
                              <td>{complaint.TIME}</td>
                              <td>{complaint.STATUS}</td>
                            </tr>
                        );
                  }))}
          </tbody>
      </Table>
      </div>
      </Container>
      </div>)
  }
}

export default Lecturer
