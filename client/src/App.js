
//import NavigationBar from './Components/NavigationBar/index.js'
import LoginForm from './Components/LoginForm/index.js'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Committee from './Components/Committee/index.js'
import Lecturer from './Components/Lecturer/index.js'
import UserProfile from './Components/UserProfile/index.js'
import NonAcademic from './Components/NonAcademic/index.js'
import Academic from './Components/Academic/index.js'
import AcademicDepartment from './Components/AcademicDepartment/index.js'
import NonAcademicDepartment from './Components/NonAcademicDepartment/index.js'
import SolveComplaint from './Components/SolveComplaint/index.js'
import StudentProfile from './Components/StudentProfile/index.js'
import ProtectedRoute from "./Components/ProtectedRoute";


function App() {
  return (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LoginForm} />
      <ProtectedRoute exact path="/committee/:id" component={Committee}/>
      <ProtectedRoute exact path="/students/:id" component={UserProfile}/>
      <ProtectedRoute exact path="/students/:id/profile/:pending/:solved/" component={StudentProfile}/>
      <ProtectedRoute exact path="/faculty/:id" component={Lecturer}/>
      <ProtectedRoute exact path="/students/:id/nonacademic" component={NonAcademic}/>
      <ProtectedRoute exact path="/students/:id/academic" component={Academic}/>
      <ProtectedRoute exact path="/committee/:id/CSE" component={() => <AcademicDepartment dept={"CSE"}/>}/>
      <ProtectedRoute exact path="/committee/:id/ECE" component={() => <AcademicDepartment dept={"ECE"}/>}/>
      <ProtectedRoute exact path="/committee/:id/EEE" component={() => <AcademicDepartment dept={"EEE"}/>}/>
      <ProtectedRoute exact path="/committee/:id/IT" component={() => <AcademicDepartment dept={"IT"}/>}/>
      <ProtectedRoute exact path="/committee/:id/Civil" component={() => <AcademicDepartment dept={"Civil"}/>}/>
      <ProtectedRoute exact path="/committee/:id/Mech" component={() => <AcademicDepartment dept={"MECH"}/>}/>
      <ProtectedRoute exact path="/committee/:id/HSS" component={() => <AcademicDepartment dept={"HSS"}/>}/>
      <ProtectedRoute exact path="/committee/:id/Finance" component={() => <NonAcademicDepartment dept={"Finance"}/>}/>
      <ProtectedRoute exact path="/committee/:id/Admissions" component={() => <NonAcademicDepartment dept={"Admissions"}/>}/>
      <ProtectedRoute exact path="/committee/:id/Ragging" component={() => <NonAcademicDepartment dept={"Ragging"}/>}/>
      <ProtectedRoute exact path="/faculty/:id/:complaint_id/solve" component={SolveComplaint}/>

    </Switch>
  </BrowserRouter>
  );
}
export default App;
