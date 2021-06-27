import {Component} from 'react';
import Header from '../Header/index.js';
import {Container,Table,Button} from 'react-bootstrap'
import Loader from 'react-loader-spinner';
import '../AcademicDepartment/AcademicDepartment.css'
class NonAcademicDepartment extends Component{
    state = {
        NonAcademicComplaints:[],
        isLoading:true,
    }
    componentDidMount(){
        this.getNonAcademicComplaintsData(this.props.dept);
    }
    getNonAcademicComplaintsData=async (dept) => {
        const url=`/nonacademiccomplaints/?dept=${dept}`;
        console.log(url);
        const response = await fetch(url)
        const data = await response.json()
        this.setState({ NonAcademicComplaints: data, isLoading:false });
        
      }
      onForward(complaintid,student_id){
            //event.preventDefault();
            const forwardstatus='Forwarded';
            const ComplaintForwardDetails = {forwardstatus,complaintid};
            
            const urlf = `/students/${student_id}/complaints`;
            console.log(urlf);            
            fetch(urlf, {
                method: 'PUT',
                mode:'cors',
                body:JSON.stringify(ComplaintForwardDetails),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
                })
                window.location.reload();
        
      }
    render(){
        console.log(this.props.dept);
        const{isLoading}=this.state;
        return(
            
            <div>
            <Header/>
            <Container>
                <div id="deptHeading"><h1>Grievences related to {this.props.dept} Department</h1></div>
                <Table striped bordered hover>
                <thead >
                  <tr>
                    <th scope="col">Greivence Number</th>
                    <th scope="col">Name</th>
                    <th scope="col">Time</th>
                    <th scope="col">Greivence Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Forward</th>
                    
                  </tr>
                </thead>
                <tbody id="ft">
                {isLoading ? (
          <Loader type="ThreeDots" color="grey" height={50} width={50} />
        ) : (
                
                  this.state.NonAcademicComplaints.map((record)=>{
                        return(
                            <tr id="trc" className="clickable-row" key={record.COMPLAINT_ID}>

                              <td >{record.COMPLAINT_ID}</td>
                              <td>{record.STUDENT_ID}</td>
                              <td>{record.TIME}</td>
                              <td>{record.COMPLAINT_DESC}</td>
                              <td>{record.STATUS}</td>
                              {record.forward_status==='Forward'?(<td><Button onClick={()=>this.onForward(record.COMPLAINT_ID,record.STUDENT_ID)}>{record.forward_status}</Button></td>):(<td><Button variant="success">{record.forward_status}</Button></td>)}
                              
                            </tr>
                        );
                  }))}
                </tbody>
              </Table>
              <Button href="./">Back</Button>
            </Container>

            </div>
        )
    }

}
export default NonAcademicDepartment;