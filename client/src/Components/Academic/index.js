import './index.css'
import {Form,Alert,FormLabel,Row,Col,Button,Container,DropdownButton,Dropdown,FormControl} from 'react-bootstrap'
import {Component, useState} from 'react'
import React from 'react'
import Header from '../Header/index.js'
import {Link} from 'react-router-dom'
class Academic extends Component{
    state = {
       departmentCheckbox:'',
       greivenceDescription:'',
       statusDesc:"",
       status:false,
       faculty:[],
       selectedFacultyId:"",
       submitResponse:"",
       alertType:"",
      }

    onSubmitData= async event=>{
        event.preventDefault();
        console.log(this.state.departmentCheckbox);
        console.log(this.state.greivenceDescription);
        console.log(this.state.selectedFacultyId);
        
            const { match } = this.props
            const { params } = match
            const { id } = params
            console.log(id);
            const {departmentCheckbox,greivenceDescription,selectedFacultyId} = this.state
            if(departmentCheckbox===""|| greivenceDescription===""||selectedFacultyId===""){
                this.setState({
                    statusDesc:"Grievence has not Posted, Please fill all the fields with valid details",
                    status:true,
                    alertType:"danger"
                })
            }
            else{
            const department=departmentCheckbox;
            const complaintDesc=greivenceDescription;
            const complaint_type='Academic';
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

    getFaculty=async event => {
                event.preventDefault();
                const dept=this.state.departmentCheckbox;
                const url=`/faculty/?dept=${dept}`;
                const response = await fetch(url)
                const data = await response.json()
                console.log(data);
                this.setState({ faculty: data });
       
           };
    
    handleChange=(evt)=>{
        this.setState({
            greivenceDescription:evt.target.value,
        })
    }
    render()
    
   
    {  console.log(this.state.departmentCheckbox);
    const { match } = this.props
    const { params } = match
    const { id } = params
    console.log(id);
    const url=`/students/${id}`;
        const {status, statusDesc} = this.state
        console.log(status,statusDesc);
        return(
            
        <div>
        
        <Header/>
            
            <Container>
            <Form onSubmit={this.onSubmitData}>
                {/*<Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                    First Name
                </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="textarea" placeholder="FirstName" />
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    Last Name
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
                
                */}
                <Container className="d-flex flex-column">
                <fieldset>
                    <Form.Group as={Row} className="mb-3">
                    <Form.Label as="legend" column sm={2}>
                        Department
                    </Form.Label>
                    
                    <Col sm={10}>

                        <Form.Check
                        type="radio"
                        label="CSE"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        value="CSE"
                        onChange={(e)=>this.setState({departmentCheckbox:e.target.value})}
                        />
                        <Form.Check
                        type="radio"
                        label="ECE"
                        name="formHorizontalRadios"
                        value="ECE"
                        id="formHorizontalRadios2"
                        onChange={(e)=>this.setState({departmentCheckbox:e.target.value})}
                        />
                        <Form.Check
                        type="radio"
                        label="EEE"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios3"
                        value="EEE"
                        onChange={(e)=>this.setState({departmentCheckbox:e.target.value})}
                        />
                        <Form.Check
                        type="radio"
                        label="IT"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios4"
                        value="IT"
                        onChange={(e)=>this.setState({departmentCheckbox:e.target.value})}
                        />
                        <Form.Check
                        type="radio"
                        label="MECH"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios5"
                        value="MECH"
                        onChange={(e)=>this.setState({departmentCheckbox:e.target.value})}
                        />
                        <Form.Check
                        type="radio"
                        label="CIVIL"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios6"
                        value="CIVIL"
                        onChange={(e)=>this.setState({departmentCheckbox:e.target.value})}
                        />
                        <Form.Check
                        type="radio"
                        label="H&SS"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios7"
                        value="HSS"
                        onChange={(e)=>this.setState({departmentCheckbox:e.target.value})}
                        />
                    </Col>
                    <Form.Label as="legend" column sm={2}>
                        Choose a Faculty
                    </Form.Label>
                <DropdownButton id="dropdown-basic-button" title="Dropdown button" onClick={this.getFaculty}>

                    {this.state.faculty.map((item)=>{
                        console.log(item);
                        return(<Dropdown.Item key={item.USER_ID} onClick={(e)=>this.setState({selectedFacultyId:item.USER_ID})}>{item.NAME}</Dropdown.Item>);
                    })}
                </DropdownButton>
                  
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
export default Academic;