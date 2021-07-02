import './committeProfile.css'
import {Form,FormLabel,Row,Col,Button,Container,Alert,Navbar} from 'react-bootstrap'
import {Component} from 'react'
import {Link} from 'react-router-dom';
import Header from '../Header/index.js'
import ProfilePic from '../profilePic/index.js'



const committeeProfile = () => {
    return(
        <div>
            <div>
        <Navbar expand="lg" variant="light" bg="light">
                    <Container>
                <Navbar.Brand id='NB' href="#">Your's Profile</Navbar.Brand>
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
                    <Row id="fname">
                    <h1 id="h1">First name:</h1>
                    <Form.Control placeholder="First name" />
                    </Row>
                    <Row id="lname">
                    <h1 id="h1">Last name:</h1>
                    <Form.Control placeholder="Last name" />
                    </Row>
                    <div className="conatiner1 d-flex flex-row">
                            

                            <Row id="fname">
                            <h1 id="h2">Email :</h1>
                            <Form.Control id="text" placeholder="Roll Number" />
                            </Row>
                    </div>
                    <div className="conatiner1 d-flex flex-row">
                            <Row id="fname">
                            <h1 id="h2">Total Complaints:</h1>
                            <Form.Control placeholder="count" />
                            </Row>

                            <Row id="fname">
                            <h1 id="h2">Pending Complaints:</h1>
                            <Form.Control id="text" placeholder="count" />
                            </Row>

                            <Row id="fname">
                            <h1 id="h2">Forwarded Complaints:</h1>
                            <Form.Control id="text" placeholder="count" />
                            </Row>
                    </div>

                    
                </Row>
            </Form>
            </div>
        </div>


        
        </div>
            )
    }
export default committeeProfile;