import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './components/Header';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <Router>
        <Header />
        <div className='main'>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' render={(props) => <Login {...props}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            setUser={setUser}
            user={user}
          />} />
          <Route exact path='/signup' render={(props) => <SignUp {...props}
            setLoggedIn={setLoggedIn}
            setUser={setUser}
            user={user}
          />} />
        </div>
      </Router>
    </div>
  );
}

export default App;
