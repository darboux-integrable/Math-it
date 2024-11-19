import { Router, Route } from "@solidjs/router";
import Landing from "./components/Landing";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import UserLanding from "./components/UserLanding";
import MathPractice from "./components/mathPractice";
import SubjectPage from "./components/SubjectPage";
import { useParams } from "@solidjs/router";
import FormsLanding from "./components/FormsLanding";

function App() {
  return (
      <Router>
        <Route path="/" component={<Landing />}></Route>

        <Route path="/signup" component={<SignUp />}></Route>
 
        <Route path="/login" component={<Login />}></Route>

        <Route path="/users/:id/practice" component={<MathPractice />}></Route>

        <Route
          path="users/:id/practice/:subject"
          component={() => {
            const params = useParams();
            return <SubjectPage params={params} />;
          }}
        ></Route>

        <Route path="/users/:id/landing" component={<UserLanding />}></Route>

        <Route path="/questions" component={<FormsLanding />}></Route>
      </Router>
  );
}

export default App;
