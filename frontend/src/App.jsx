import { Router, Route } from "@solidjs/router";
import Landing from './components/Landing';
import SignUp from "./components/SignUp";
import UserLanding from "./components/UserLanding";
import MathPractice from "./components/mathPractice";
import SubjectPage from "./components/SubjectPage";

function App() {

  return (

    <Router>

      <Route path="/" component={<Landing/>}></Route>

      <Route path="/signup" component={<SignUp/>}></Route>

      <Route path="/users/:id/practice" component={<MathPractice/>}></Route>

      <Route path="/users/:id/landing" component={<UserLanding />}></Route>

      <Route path="users/:id/practice/:subject" component={<SubjectPage />}></Route>

    </Router>

  )

}

export default App;
