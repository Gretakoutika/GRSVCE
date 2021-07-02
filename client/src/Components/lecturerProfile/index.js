
import {Form,FormLabel,Row,Col,Button,Container,Alert,Navbar} from 'react-bootstrap'
import {Component} from 'react'
import {Link} from 'react-router-dom';
import Header from '../Header/index.js'
import ProfilePic from '../profilePic/index.js'



class lecturerProfile extends Component{
    state={lecturerData:{}}
    componentDidMount(){
        this.getlecturerData();
    }
    getlecturerData = async () => {
        const { match } = this.props
        const { params } = match
        console.log(params);
        const { id} = params
        const url=`/faculty/${id}`;
        const response = await fetch(url)
        const data = await response.json()
        
        this.setState({ lecturerData: data})
    
    }
    render(){
        const { match } = this.props
        const { params } = match
        const {pending,solved,id} = params
        const url=`/faculty/${id}`;
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
                <Container>
                    <Row id="fname" className="col-xs-12 col-md-5">
                    <h6>Name:</h6>
                    <Form.Control placeholder="First name" value={this.state.lecturerData.NAME} />
                    
                    </Row>
                    <Row id="fname" className="col-xs-12 col-md-5">
                            <h6>Contact</h6>
                            <Form.Control id="text" placeholder="contact" value={this.state.lecturerData.CONTACT} />
                            </Row>
                    <div className="d-flex flex-row">
                            <Row id="fname" className="col-xs-12 col-md-5">
                            <h6>Department:</h6>
                            <Form.Control placeholder="Department" value={this.state.lecturerData.DEPARTMENT}/> 
                            </Row>

                            <Row id="fname" className="col-xs-12 col-md-5">
                            <h6>Email :</h6>
                            <Form.Control id="text" placeholder="Email" value={this.state.lecturerData.USERNAME} />
                            </Row>
                    </div>
                    <div className="container1 d-flex flex-row">
                            <Row id="fname" className="col-xs-12 col-md-5">
                            <h6>Total Complaints:</h6>
                            <Form.Control placeholder="count" value={parseInt(pending)+parseInt(solved)}/>
                            </Row>

                            <Row id="fname" className="col-xs-12 col-md-5">
                            <h6 >Pending Complaints:</h6>
                            <Form.Control id="text" placeholder="count" value={parseInt(pending)} />
                            </Row>

                            <Row id="fname" className="col-xs-12 col-md-5">
                            <h6>Solved Complaints:</h6>
                            <Form.Control id="text" placeholder="count" value={parseInt(solved)}/>
                            </Row>
                    </div>

                    
                </Container>
            </Form>
            <Button href={url}>Back</Button>
            </div>
        </div>


        
        </div>
            )
    }}
export default lecturerProfile;