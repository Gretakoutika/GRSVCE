import './index.css'
import {Form,FormLabel,Row,Col,Button,Container,Alert} from 'react-bootstrap'
import {Component} from 'react'
import {Link} from 'react-router-dom';
import Header from '../Header/index.js'



class NonAcademic extends Component{
    state = {
       departmentCheckbox:'',
       greivenceDescription:'',
       statusDesc:"",
       status:false,
       alertType:"",
      }
    onSubmitData= async event=>{
     event.preventDefault();
        console.log(this.state.departmentCheckbox);
        console.log(this.state.greivenceDescription);
    const { match } = this.props
    const { params } = match
    const { id } = params
    console.log(id);
    const {departmentCheckbox,greivenceDescription} = this.state
    const department=departmentCheckbox;
    const complaintDesc=greivenceDescription;

    var selectedFacultyId=0;
    if(departmentCheckbox==='Finance'){
        selectedFacultyId=2
    }
    else if(departmentCheckbox==='Admissions'){
        selectedFacultyId=16
    }
    else if(departmentCheckbox==='Ragging'){
        selectedFacultyId=15
    }
    const complaint_type="NonAcademic";
    if(departmentCheckbox==="" || greivenceDescription==="" || selectedFacultyId===""){
        this.setState({
            statusDesc:"Grievence has not Posted, Please fill all the fields with valid details",
            status:true,
            alertType:"danger"
        })
    }
    else{
    const ComplaintDetails = {department,complaintDesc,selectedFacultyId,complaint_type}
    const url = `/students/${id}/complaints`;
    console.log(url);
    console.log(JSON.stringify(ComplaintDetails));
    
    const response=await fetch(url, {
        method: 'POST',
        mode:'cors',
        body:JSON.stringify(ComplaintDetails),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        })
        

        if(response.ok===true){
            this.setState({
                statusDesc:"Grievence Posted Successfully",
                status:true,
                alertType:"success"
            })
        }
        else{
            this.setState({
                statusDesc:"Grievence Not Posted Successfully",
                status:true,
                alertType:"danger"
            })
        }
        }
    }
    handleChange=(evt)=>{
        this.setState({
            greivenceDescription:evt.target.value,
        })
    }
    render()
   
{  const {status, statusDesc} = this.state;
    const { match } = this.props
    const { params } = match
    const { id } = params
    console.log(id);
    const url=`/students/${id}`;
return(
    
        <div>
        
        <Header/>
            
            <Container>
            <Form onSubmit={this.onSubmitData}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                    First Name
                </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="textarea" placeholder="FirstName" />
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    Email
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="textarea" placeholder="LastName" />
                    </Col>
                </Form.Group>



                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    Email
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="email" placeholder="Email" />
                    </Col>
                </Form.Group>
                
                
                <Container className="d-flex flex-column">
                <fieldset>
                    <Form.Group as={Row} className="mb-3">
                    <Form.Label as="legend" column sm={2}>
                        Department
                    </Form.Label>
                    
                    <Col sm={10}>

                        <Form.Check
                        type="radio"
                        label="Finance"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        value="Finance"
                        onChange={(e)=>this.setState({departmentCheckbox:e.target.value})}
                        />
                        <Form.Check
                        type="radio"
                        label="Ragging"
                        name="formHorizontalRadios"
                        value="Ragging"
                        id="formHorizontalRadios2"
                        onChange={(e)=>this.setState({departmentCheckbox:e.target.value})}
                        />
                        <Form.Check
                        type="radio"
                        label="Admissions"
                        value="Admissions"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios3"
                        onChange={(e)=>this.setState({departmentCheckbox:e.target.value})}
                        />
                    </Col>
                  
                    </Form.Group>
                </fieldset>
                </Container>
                <FormLabel>Enter your Grievence:  </FormLabel>
                {/*COMPLAINT TEXTAREA*/}

                <div  label="Comments">
                <Form.Control
                as="textarea"
                name="greivenceDescription"
                placeholder="Enter your grievence here"
                style={{ height: '100px' }}
                onChange={this.handleChange}
                value={this.state.greivenceDescription}
                />
                </div>
                
                {/* SUBMIT BUTTON */}
                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit" onClick={this.onSubmitData}>SUBMIT</Button>
                    </Col>
                </Form.Group>

                {this.state.status === true ? (
						<Alert
							variant={this.state.alertType}
							onClose={() => {
								this.setState({
									status: false,
								});
							}}
							dismissible
						>
							<Alert.Heading>{this.state.statusDesc}</Alert.Heading>
						</Alert>
					) : null}

                </Form>
                <Button ><Link id="backbtn" to={url}>Back</Link></Button>
               
                </Container>
        </div>
    )
}}
export default NonAcademic;