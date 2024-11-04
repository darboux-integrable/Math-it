import { Router, Route } from "@solidjs/router";
import Landing from './components/Landing';

function App() {

  return (

    <Router>

      <Route path="/" component={<Landing/>}></Route>

    </Router>

  )

}

export default App;
