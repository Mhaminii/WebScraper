import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./component/layout/Header";
import Footer from "./component/layout/Footer";
import Home from "./component/Home";
import ProductApplication from "./component/ProductApplication"
import jobsApplication from "./component/jobsApplication"
import JobDetails from './component/job/JobDetails';
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/" component={Home} exact />
        <Route path="/jobs/:id" component={JobDetails} exact />
        <Route path="/jobsApplication" component={jobsApplication} />
        <Route path="/ProductApplication" component={ProductApplication} />
        <Route path="/search/:keyword" component={Home} />
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
