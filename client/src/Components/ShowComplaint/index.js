import {Component} from 'react';
import Header from '../Header/index.js';
import {Container,InputGroup,FormControl,Form,Button,Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import emailjs from 'emailjs-com'

class ShowComplaint extends Component{
    state={
        complaintDetails:{}
    }
    componentDidMount(){
        this.getComplaintData();
    }

    getComplaintData=async () => {

        const { match } = this.props;
        const { params } = match;
        const { id,complaint_id } = params;
        console.log(id,complaint_id);
        const url=`/complaint/${complaint_id}/`;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        this.setState({ complaintDetails: data});
        
    }
    
    render(){
    const { match } = this.props;
    const { params } = match;
    const { id,complaint_id } = params;
    const url=`/students/${id}`;
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
                
                
            </Container>
            <Button href={url}>Back</Button>
            </Container>

        );
    }
}
export default ShowComplaint;