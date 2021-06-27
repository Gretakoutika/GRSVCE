import './index.css'
import {Form,FormLabel,Row,Col,Button,Container,Alert,Navbar} from 'react-bootstrap'
import {Component} from 'react'
import {Link,Route} from 'react-router-dom';
import Header from '../Header/index.js'
import ProfilePic from '../profilePic/index.js'
class StudentProfile extends Component{
    state = { studentData: {}}

    componentDidMount(){
        this.getStudentData();
    }
    
    getStudentData = async () => {
        const { match } = this.props
        const { params } = match
        console.log(params);
        const { id} = params
        const url=`/students/${id}`;
        const response = await fetch(url)
        const data = await response.json()
        const updatedData = {
        lastName: data.FIRST_NAME,
        firstName: data.LAST_NAME,
        department: data.DEPARTMENT,
        email:data.USERNAME,
        pictureUrl: data.PICTURE,
        }
        this.setState({ studentData: updatedData})

    }

    render() {
        
        const {studentData}=this.state;
        const { match } = this.props
        const { params } = match
        console.log(params);
        const {id,pending,solved} = params
        
        return(
            <div>
                <div>
                    <Navbar expand="lg" variant="light" bg="light">
                        <Container>
                            <Navbar.Brand id='NB' href="#">Your Profile</Navbar.Brand>
                        </Container>
                    </Navbar>
                </div>
                <Header/>
        
                <div className="container d-flex flex-row" id="downpart">
                    <div>
                        <ProfilePic/>
                    </div>
                    <div>
                    <Form>
                        <Row>
                            <Row className="m-2 col-xs-12 col-md-5">
                            <h1 className="labelHeading">First name:</h1>
                            <Form.Control value={studentData.firstName} placeholder="First name" />
                            </Row>
                            <Row className="m-2 col-xs-12 col-md-5">
                            <h1 className="labelHeading">Last name:</h1>
                            <Form.Control value={studentData.lastName} placeholder="Last name" />
                            </Row>
                            <Row className="container1 d-flex flex-row">
                                    <Row  className="m-2 col-xs-12 col-md-5">
                                    <h1 className="labelHeading">Department</h1>
                                    <Form.Control value={studentData.department} placeholder="Department" />
                                    </Row>

                                    <Row   className="m-2 col-xs-12 col-md-5">
                                    <h1 className="labelHeading">Email :</h1>
                                    <Form.Control  value={studentData.email} id="text" placeholder="email" />
                                    </Row>
                            </Row>
                            <Row className="conatiner1 d-flex flex-row">
                                    <Row  className="m-2 col-xs-12 col-md-3">
                                    <h1 className="labelHeading" >Complaints Raised:</h1>
                                    <Form.Control value={parseInt(pending)+parseInt(solved)} placeholder="Count" />
                                    </Row>

                                    <Row  className="m-2 col-xs-12 col-md-3">
                                    <h1 className="labelHeading">Pending Complaints:</h1>
                                    <Form.Control value = {parseInt(pending)} id="text" placeholder="Count" />
                                    </Row>

                                    <Row  className="m-2 col-xs-12 col-md-3">
                                    <h1 className="labelHeading">Solved Complaints:</h1>
                                    <Form.Control value ={parseInt(solved)} id="text" placeholder="Count" />
                                    </Row>
                            </Row>

                            
                        </Row>
                    </Form>
                    </div>
            </div>


            
            </div>
                )
        }
}
export default StudentProfile;