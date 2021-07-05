import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Shop from './pages/Shop';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import API from './utils/API';
import ProductPage from './pages/ProductPage';
import MyCart from './pages/MyCart';
import CartContext from './utils/CartContext';
// import WithAuth from './components/WithAuth';

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [, setLoaded] = useState(false);
  
  const [cart, setCart] = useState({
    items: [],
    addItem: (item) => setCart((curr) => {
      const newCartList = [...curr.items, item];
      localStorage.setItem('currentCart', JSON.stringify(newCartList));
      return { ...curr, items: newCartList }
    }),
    removeItem: (item) => setCart((curr) => ({ ...curr, items: [...curr.items.splice(...curr.item.indexOf(item), 1)] }))
  });

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
    const currentCart = JSON.parse(localStorage.getItem('currentCart')) || [];
    setCart((curr) => ({ ...curr, items: currentCart }));
  }, []);

  const handleLogout = () => {
    setUser({});
    API.logOut();
  };

  return (
    <div>
      <CartContext.Provider value={cart}>
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
              <Route exact path='/cart' render={(props) => <MyCart {...props} user={user} />} />
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
      </CartContext.Provider>
    </div>
  );
}

export default App;
