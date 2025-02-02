import { Router, Route, useParams } from "@solidjs/router";
import Landing from "./components/Landing";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import MathPractice from "./components/mathPractice";
import AskQuestionPage from "./components/AskQuestionPage";
import ResourcesPage from "./components/ResourcesPage";
import TextAreaHelpPage from "./components/TextAreaHelpPage";
import PageNotFoundPage from "./components/PageNotFound";
import { lazy } from "solid-js";

const QuestionPage = lazy(() => import("./components/QuestionPage"));

const FormsLanding = lazy(() => import("./components/FormsLanding"));

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
const DiscussionsPage = lazy(() => import("./components/DiscussionsPage"));
const CreateClassroomDiscussionPage = lazy(() => import("./components/CreateClassroomDiscussionPage"));

const DiscussionPage = lazy(() => import("./components/DiscussionPage"));

const UserLanding = lazy(() => import("./components/UserLanding"));

const DiscussionPostPage = lazy(() => import("./components/DiscussionPostPage"))

const GradesPage = lazy(() => import("./components/ClassroomGradesPage"));

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
        path="/classrooms/landing"
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
        path="/classrooms/:id/learner/"
        component={() => <ClassroomStudentPage />}
      ></Route>

      <Route
        path="/classrooms/:id/learner/assignments"
        component={() => <ClassroomStudentAssignmentPage />}
      ></Route>

      <Route
        path="/classrooms/:id/learner/assignments/:assignmentId"
        component={() => <AssignmentPage />}
      ></Route>

      <Route
        path="/classrooms/:id/learner/assignments/:assignmentId/description"
        component={() => <AssignmentDetailsPage />}
      ></Route>

      <Route
        path="/classrooms/:id/learner/discussions"
        component={() => <DiscussionsPage accountType="learner" />}
      ></Route>

      <Route
        path="/classrooms/:id/learner/discussions/:discussionId"
        component={() => <DiscussionPage accountType="learner" />}
      ></Route>

      <Route
        path="/classrooms/:id/learner/discussions/:discussionId/:postId"
        component={() => <DiscussionPostPage accountType="learner" />}
      ></Route>

      <Route
        path="/classrooms/:id/learner/grades"
        component={() => <GradesPage accountType="learner" />}
      ></Route>

      <Route
        path="/classrooms/:id/educator/discussions"
        component={() => <DiscussionsPage accountType="educator" />}
      ></Route>

      <Route
        path="/classrooms/:id/educator/discussions/create"
        component={() => <CreateClassroomDiscussionPage />}
      ></Route>

      <Route
        path="/classrooms/:id/educator/discussions/:discussionId"
        component={() => <DiscussionPage accountType="educator" />}
      ></Route>

      <Route
        path="/classrooms/:id/educator/discussions/:discussionId/:postId"
        component={() => <DiscussionPostPage accountType="educator" />}
      ></Route>

      <Route
        path="/classrooms/:id/educator/grades"
        component={() => <GradesPage accountType="educator" />}
      ></Route>

      <Route path="/practice" component={<MathPractice />}></Route>

      <Route
        path="/questions"
        component={() => <FormsLanding subjectFilterInit={"all tags"} />}
      ></Route>

      <Route path="/questions/ask" component={<AskQuestionPage />}></Route>

      <Route
        path="/questions/tags/:tag"
        component={() => {
          const params = useParams();
          const tag = params.tag;
          return <FormsLanding subjectFilterInit={tag} />;
        }}
      ></Route>

      <Route path="/questions/:id" component={() => <QuestionPage />}></Route>

      <Route path="/resources" component={<ResourcesPage />}></Route>

      <Route path="/help/textArea" component={<TextAreaHelpPage />}></Route>

      {/* This must stay as the last Route */}
      <Route path={"/:otherPage"} component={<PageNotFoundPage />}></Route>
    </Router>
  );
}

export default App;
