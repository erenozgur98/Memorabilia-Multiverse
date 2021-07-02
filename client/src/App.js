import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import API from './utils/API';

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  // const [loaded, setLoaded] = useState(false); will use later

  useEffect(() => {
    API.loggedIn()
      .then(x => {
        console.log('useEffect console log line 17: ', x.data)
        setUser(x.data);
        // setLoaded(true); will use later
      })
      .catch(err => {
        console.log(err);
        // setLoaded(true); will use later
      })
  }, []);

  const handleLogout = () => {
    console.log('logged out')
    setUser({});
    API.logOut();
  };

  return (
    <div>
      <Router>
        <Header user={user} handleLogout={handleLogout} />
        <div className='main'>
          <Route exact path='/' component={Home} />
          <Route exact path='/home' component={Home} />
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
