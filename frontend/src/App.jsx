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

const ClassroomStudentPage = lazy(() =>
  import("./components/ClassroomStudentLanding")
);
const ClassroomEducatorPage = lazy(() =>
  import("./components/ClassroomEducatorLanding")
);
const ClassroomsLandingPage = lazy(() => import("./components/ClassroomsPage"));
const ClassroomStudentAssignmentPage = lazy(() =>
  import("./components/StudentAssignmentsPage")
);
const EducatorAssignmentsPage = lazy(() =>
  import("./components/EducatorAssignmentsPage")
);
const EducatorAssignmentPage = lazy(() =>
  import("./components/EducatorAssignmentPage")
);
const AddAssignmentPage = lazy(() => import("./components/AddAssignmentPage"));
const AssignmentDetailsPage = lazy(() =>
  import("./components/AssignmentDetailsPage")
);
const AssignmentPage = lazy(() => import("./components/AssignmentPage"));
const EducatorDiscussionPage = lazy(() => import("./components/EducatorDiscussionPage"));
const UserLanding = lazy(() => import("./components/UserLanding"));

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
        component={() => <ClassroomsLandingPage />}
      ></Route>

      <Route
        path="/classrooms/:id/educator"
        component={() => <ClassroomEducatorPage />}
      ></Route>

      <Route
        path="/classrooms/:id/educator/assignments"
        component={() => <EducatorAssignmentsPage />}
      ></Route>

      {/* Pulls up a page for the educator to see what the student put for their answers for an asssignment */}
      <Route
        path={"/classrooms/:id/educator/assignments/:assignmentId/:studentId"}
        component={() => <EducatorAssignmentPage />}
      ></Route>

      <Route
        path="/classrooms/:id/educator/assignments/add"
        component={() => <AddAssignmentPage />}
      ></Route>

      <Route
        path="/classrooms/:id"
        component={() => <ClassroomStudentPage />}
      ></Route>

      <Route
        path="/classrooms/:id/assignments"
        component={() => <ClassroomStudentAssignmentPage />}
      ></Route>

      <Route
        path="/classrooms/:id/assignments/:assignmentId"
        component={() => <AssignmentPage />}
      ></Route>

      <Route
        path="/classrooms/:id/assignments/:assignmentId/description"
        component={() => <AssignmentDetailsPage />}
      ></Route>

      <Route
        path="/classrooms/:id/educator/discussions"
        component={() => <EducatorDiscussionPage />}
      ></Route>

      <Route path="/practice" component={<MathPractice />}></Route>

      <Route path="/questions" component={<FormsLanding />}></Route>

      <Route path="/questions/ask" component={<AskQuestionPage />}></Route>

      <Route path="/questions/:id" component={() => <QuestionPage />}></Route>

      <Route path="/resources" component={<ResourcesPage />}></Route>

      <Route path="/help/textArea" component={<TextAreaHelpPage />}></Route>

      {/* This must stay as the last Route */}
      <Route path={"/:otherPage"} component={<PageNotFoundPage />}></Route>
    </Router>
  );
}

export default App;
