import { useState, useEffect } from 'react';
import { getUser } from './services/fetch-utils';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import AuthPage from './AuthPage';
import { logout } from './services/fetch-utils';
import ListPage from './ListPage';

import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  // track the user in state

  // add a useEffect to get the user and inject the user object into state on load

  useEffect(() => {
    async function fetch() {
      const user = await getUser();

      if (user) setUser(user);
    }

    fetch();
  }, []);

  async function handleLogout() {

    await logout();
    setUser(null);
    // call the logout function
    // clear the user in state
  }

  return (
    <Router>
      <div className='App'>
        <header>
          {user && <button onClick={handleLogout}>Logout</button>}
          {/* if there's a user, render a logout button here */}
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              {
                user
                  ? <Redirect to='./shopping-list' />
                  : <AuthPage setUser={setUser} />
              }
              {/* if there is a user, redirect to the list. Otherwise, render the auth page. Note that the AuthPage will need a function called setUser that can set the user state in App.js */}
            </Route>
            <Route exact path="/shopping-list">
              {
                user 
                  ? <ListPage />
                  : <Redirect to='/' />
              }
              {/* if there's a user, take them to the list page. Otherwise, redirect them to the home/auth page */}

            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );}