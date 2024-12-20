import { Router, Route, useParams } from "@solidjs/router";
import Landing from "./components/Landing";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import MathPractice from "./components/mathPractice";
import QuestionPage from "./components/QuestionPage";
import FormsLanding from "./components/FormsLanding";
import AskQuestionPage from "./components/AskQuestionPage";
import ResourcesPage from "./components/ResourcesPage";
import TextAreaHelpPage from "./components/TextAreaHelpPage";
import PageNotFoundPage from "./components/PageNotFound";
import { lazy } from "solid-js";

const ClassroomStudentPage = lazy(() => import("./components/ClassroomStudentLanding"))
const ClassroomLandingPage = lazy(() => import("./components/ClassroomsPage"))
const UserLanding = lazy(() => import("./components/UserLanding"))
function App() {
  return (
    <Router>
      <Route path="/" component={<Landing />}></Route>

      <Route path="/signup" component={<SignUp />}></Route>

      <Route path="/login" component={<Login />}></Route>

      <Route path="/users/landing/" component={() => <UserLanding />}></Route>

      <Route
        path="/errors/pageNotFound"
        component={<PageNotFoundPage />}
      ></Route>

      <Route
        path="/classrooms/landing/"
        component={() => <ClassroomLandingPage />}
      ></Route>

      <Route
        path="/classrooms/:id"
        component={() => <ClassroomStudentPage />}
      ></Route>

      <Route path="/practice" component={<MathPractice />}></Route>

      <Route path="/questions" component={<FormsLanding />}></Route>

      <Route path="/questions/ask" component={<AskQuestionPage />}></Route>

      <Route path="/questions/:id" component={() => <QuestionPage />}></Route>

      <Route path="/resources" component={<ResourcesPage />}></Route>

      <Route path="/help/textArea" component={<TextAreaHelpPage />}></Route>
    </Router>
  );
}

export default App;
