import {Component} from 'react';
import Header from '../Header/index.js';
import {Container,InputGroup,FormControl,Form,Button,Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './solvecomplaint.css'
import emailjs from 'emailjs-com'

class SolveComplaint extends Component{
    state={
        complaintDetails:{},solution:"",status:false,statusDesc:"",alertType:"",showSubmitButton:true,emailstatus:false,
        textAreaError:""
    }
    componentDidMount(){
       
        this.getComplaintData();
    }

    getComplaintData=async () => {

        const { match } = this.props;
        const { params } = match;
        const { id,complaint_id } = params;
        console.log(id,complaint_id);
        const url=`/faculty/${id}/${complaint_id}/`;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        this.setState({ complaintDetails: data});
        
    }
    handleChange=(evt)=>{
        console.log(evt.target.value);
        this.setState({
            solution:evt.target.value,
        })
    }
    validate=()=>{
        let textAreaError="";
        if(this.state.solution===""){
            textAreaError="Please Type a Solution!"
        }
        if(textAreaError){
            this.setState({
                textAreaError:textAreaError
            })
            return false
        }
        return true
    }
    postSolution = async event=>{
        console.log("posting");
            event.preventDefault();
            const { match } = this.props;
            const { params } = match;
            const { complaint_id } = params;
            const solution=this.state.solution;
            const isValid=this.validate();
            console.log(isValid);
            if(isValid){            
                const posturl = `http://localhost:4000/${complaint_id}/solution`;
                const puturl=`http://localhost:4000/${complaint_id}/changestatus`;
                const solutionbody={solution};
                const response_post=await fetch(posturl, {
                method: 'POST',
                mode:'cors',
                body:JSON.stringify(solutionbody),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
                })
                const response_put=await fetch(puturl, {
                    method: 'PUT',
                    mode:'cors',
                    })

                if(response_post.ok===true && response_put.ok===true){
                    this.setState({
                        statusDesc:"Solution Posted Successfully",
                        status:true,
                        showSubmitButton:false,
                        alertType:"success",
                        
                    })

                }
                else{
                    this.setState({
                        statusDesc:"Solution Not Posted Successfully",
                        status:true,
                        showSubmitButton:true,
                        alertType:"danger"
                    })
                }
            }

    }
    sendEmail=()=> {
        //e.preventDefault();
        console.log("in emailsending function");
        const {complaintDetails} = this.state;
        console.log(complaintDetails);
        emailjs.send("service_75t5i84","template_5tubaix",{
            to_name: complaintDetails.FIRST_NAME+complaintDetails.LAST_NAME,
            id: complaintDetails.COMPLAINT_ID,
            email: complaintDetails.USERNAME,
        },"user_nz020AILOKcC1JySoFhrq")
          .then((result) => {
              this.setState({
                  emailstatus:true
              })
              console.log(this.state.emailstatus)
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          
        }
      
    render(){
    const { match } = this.props;
    const { params } = match;
    const { id,complaint_id } = params;
    console.log(id,complaint_id);
        return(
            <Container>
            <Header/>
            <Container className="d-flex  flex-box flex-column">
            
                <div className="d-flex flex-box flex-row">
                    <h3 className="heading">Grievence Id:</h3>
                    <h3 className="ans" name="id">{this.state.complaintDetails.COMPLAINT_ID}</h3>
                </div>
                <div className="d-flex flex-box flex-row">
                    <h3 className="heading">Student Id:</h3>
                    <h3 className="ans">{this.state.complaintDetails.STUDENT_ID}</h3>
                </div>
                <div className="d-flex flex-box flex-row">
                    <h3 className="heading">First Name:</h3>
                    <h3 className="ans">{this.state.complaintDetails.FIRST_NAME}</h3>
                </div>
                <div className=" d-flex flex-box flex-row">
                    <h3 className="heading">Last Name:</h3>
                    <h3 className="ans">{this.state.complaintDetails.LAST_NAME}</h3>
                </div>
                <div className=" d-flex flex-box flex-row">
                    <h3 className="heading">Grievence Description:</h3>
                    <h3 className="ans">{this.state.complaintDetails.COMPLAINT_DESC}</h3>
                </div>
                <div className=" d-flex flex-box flex-row">
                    <h3 className="heading">Time:</h3>
                    <h3 className="ans">{this.state.complaintDetails.TIME}</h3>
                </div>
                <div className=" d-flex flex-box flex-row">
                    <h3 className="heading">Status:</h3>
                    <h3 className="ans">{this.state.complaintDetails.STATUS}</h3>
                </div>
                {this.state.complaintDetails.STATUS==='Pending'?(
                        <Form onSubmit={this.sendEmail}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label className="heading">Solution:</Form.Label>
                        <Form.Control
                        as="textarea"
                        name="solution"
                        placeholder="Enter your solution here"
                        style={{ height: '100px' }}
                        onChange={this.handleChange}
                        value={this.state.solution}
                        />
                        </Form.Group>
                        <Button type="submit" className="mr-2" onClick={this.postSolution}>Submit</Button>
                        <div style={{color:"red",fontSize:20}}>{this.state.textAreaError}</div>
                        </Form>
                ):null} 
                    
                    
                
                  {this.state.status === true ? (
						<Alert
							variant={this.state.alertType}
							onClose={() => {
								this.setState({
									status: false,
								});
							}}
                            className="fixed-top"
							dismissible
						>
							<Alert.Heading>{this.state.statusDesc}</Alert.Heading>
						</Alert>
					) : null}
                    {this.state.emailstatus===true?<Button className="btn btn-success m-2">Email Sent</Button>:<Button className="m-2" onClick={this.sendEmail}>Send Email</Button>}
                    
                
            </Container>
            </Container>
        );
    }
}
export default SolveComplaint;