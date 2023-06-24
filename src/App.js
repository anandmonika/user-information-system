import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Navbar from "./components/layout/Navbar";
import Adduser from "./components/users/Adduser";
import EditUser from "./components/users/EditUser";
import UserView from "./components/users/UserView";
import pageNotFound from "./components/pages/pageNotFound";
import { BrowserRouter as Router, Route,  Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/about" component={About}></Route>
          <Route exact path="/user/add" component={Adduser}></Route>
          <Route exact path="/user/edit/:id" component={EditUser}></Route>
          <Route exact path="/user/:id" component={UserView}></Route>
          <Route exact path="*" component={pageNotFound}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
