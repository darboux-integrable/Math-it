import { Router, Route } from "@solidjs/router";
import Landing from './components/Landing';
import SignUp from "./components/SignUp";

function App() {

  return (

    <Router>

      <Route path="/" component={<Landing/>}></Route>

      <Route path="/signup" component={<SignUp/>}></Route>

    </Router>

  )

}

export default App;
