import { Router, Route } from "@solidjs/router";
import Landing from "./components/Landing";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import UserLanding from "./components/UserLanding";
import MathPractice from "./components/mathPractice";
import { useParams } from "@solidjs/router";
import QuestionPage from "./components/QuestionPage";
import FormsLanding from "./components/FormsLanding";

function App() {
  return (
    <Router>
      <Route path="/" component={<Landing />}></Route>

      <Route path="/signup" component={<SignUp />}></Route>

      <Route path="/login" component={<Login />}></Route>

      <Route path="/users/:id/landing" component={<UserLanding />}></Route>

      <Route path="/practice" component={<MathPractice />}></Route>

      <Route path="/questions" component={<FormsLanding />}></Route>

      <Route
        path="/questions/:id"
        component={() => {
          const params = useParams();
          return <QuestionPage id={params.id} />;
        }}
      ></Route>
    </Router>
  );
}

export default App;
