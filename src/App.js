import './App.css';
import Department from './components/Department';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Employee from './components/Employee';
import EmpDetails from './components/EmpDetails';
import EditEmp from './components/EditEmp';
import { EmpProvider } from './components/EmpContext';
import EmpView from './components/EmpView';
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer } from "react-toastify";
import DeleteEmp from './components/DeleteEmp';
import DeleteDept from './components/DeleteDept';

// CALL IT ONCE IN YOUR APP
injectStyle();

if (typeof window !== "undefined") {
  injectStyle();
}
function App() {

  return (
    <div className="App">
      <>
        <EmpProvider>
          <Router>
            <Navbar />
            <Switch>
              <Route path="/delete-dept/:id">
                <DeleteDept />
              </Route>
              <Route path="/delete-emp/:id">
                <DeleteEmp />
              </Route>
              <Route path="/add-dept">
                <Department />
              </Route>
              <Route path="/add-emp">
                <Employee />
              </Route>
              <Route path="/edit-emp">
                <EditEmp />
              </Route>
              <Route path="/emp-details">
                <EmpView />
              </Route>
              <Route path="/">
                <EmpDetails />
              </Route>
            </Switch>
          </Router>
        </EmpProvider>
        <ToastContainer />
      </>
    </div>
  );
}

export default App;
