import './App.css';
import Dashboard from './dashboard/Dashboard';
import Home from './home/home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
    <Router>  
      <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
