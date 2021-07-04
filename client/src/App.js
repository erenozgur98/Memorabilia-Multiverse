import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Shop from './pages/Shop';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import API from './utils/API';
import ProductPage from './pages/ProductPage';
// import WithAuth from './components/WithAuth';

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [, setLoaded] = useState(false);

  useEffect(() => {
    API.loggedIn()
      .then(result => {
        setUser(result.data);
        setLoaded(true);
      })
      .catch(err => {
        console.log(err);
        setLoaded(true);
      })
  }, []);

  const handleLogout = () => {
    setUser({});
    API.logOut();
  };

  return (
    <div>
      <Router>
        <Header user={user} handleLogout={handleLogout} />
        <div className='main'>
          <Switch>
            <Route exact path='/' component={Shop} />
            <Route exact path='/shop' component={Shop} />
            <Route exact path='/shop/:id' component={Shop} />
            <Route exact path='/products/:ItemId'
              render={(props) => <ProductPage {...props} user={user} />}
            />
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
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
