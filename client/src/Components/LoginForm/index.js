import {Component} from 'react'
import {Row,Container} from 'react-bootstrap'
import Cookies from 'js-cookie'
import './loginpage.css'
import {Redirect} from 'react-router-dom'
class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }
  onSubmitSuccessStudent = (jwtToken,Student_id) => {
    const {history} = this.props
    console.log(jwtToken);
    Cookies.set('jwt_token', jwtToken, {expires: 30});
    const slink=`/students/${Student_id}`;
    console.log(slink);
    history.replace(slink);
  }
  onSubmitSuccessCommittee=(jwtToken,Committee_id) => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const slink=`/committee/${Committee_id}`;
    console.log(slink);
    history.replace(slink);
  }
  onSubmitSuccessFaculty = (jwtToken,Faculty_id) => {
    //console.log(Faculty_id);
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const slink=`/faculty/${Faculty_id}`;
    history.replace(slink);
  }
  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg:'Invalid Login Details'})
  }
  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    console.log(username,password);
    const userDetails = {username, password}
    const url = '/login'
    console.log(JSON.stringify(userDetails));
    
    fetch(url, {
      method: 'POST',
      mode:'cors',
      body:JSON.stringify(userDetails),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => { return response.json();})
      .then(responseData=>{
        console.log(responseData);
        if(responseData.type==="success"){
          if(responseData.user_type==='Student'){
            this.onSubmitSuccessStudent(responseData.jwttoken,responseData.userid);
          }
          if(responseData.user_type==='Faculty'){
            this.onSubmitSuccessFaculty(responseData.jwttoken,responseData.userid);
          }
          if(responseData.user_type==='Committee'){
            this.onSubmitSuccessCommittee(responseData.jwttoken,responseData.userid);
          }
          //this.onSubmitSuccess(responseData.jwt_token)
        
        }
        else {
          this.onSubmitFailure()
        }
        return responseData;
      })
      
      .catch((error) => console.log("error",error));
      

    }

      
    

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="PASSWORD">
          Password:
        </label>
        <input
          type="password"
          id="PASSWORD"
          className="password-input-filed"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    
    return (
      <>
        <label className="input-label" htmlFor="USERNAME">
          Username:
        </label>
        <input
          type="text"
          id="USERNAME"
          className="username-input-filed"
          value={username}
          onChange={this.onChangeUsername}
        />
        
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
  
      <div  className="container-fluid">
      <Row>
      <div className="firstHalf col-xs-12 col-md-6 Content">
        <img
          src="https://res.cloudinary.com/gretakoutika0910/image/upload/v1622183960/TBP/vlogo_x30wje.gif"
          alt="website logo"
        />
        <div className='Content'>
          <h3>Grievence Redressal Portal</h3>
        </div>
      </div>
        <div className="secondHalf col-xs-12 col-md-6">
        <form className="form-container" onSubmit={this.submitForm}>
          <h1 className="loginForm Content">Login Details</h1>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button" onClick={this.submitForm}>
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
        </div>
        </Row>
        </div>
    )
  }
}

export default LoginForm