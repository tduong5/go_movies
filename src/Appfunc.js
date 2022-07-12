import React, {useEffect, useState, Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Home from "./components/home";
import GraphQL from "./components/graphql";
import OneMovieGraphQL from "./components/onemoviegraphql";
import MoviesFunc from "./components/func/moviesfunc";
import GenresFunc from "./components/func/genresfunc";
import OneMovieFunc from "./components/func/onemoviefunc";
import OneGenreFunc from "./components/func/onegenrefunc";
import EditMovieFunc from "./components/func/editmoviefunc";
import AdminFunc from "./components/func/adminfunc";
import LoginFunc from "./components/func/loginfunc";

export default function AppFunc(props) {
    const [jwt, setJWT] = useState("");


    useEffect(() => {
        let t = window.localStorage.getItem("jwt");
        if (t) {
          if (jwt === "") {
            setJWT(JSON.parse(t));
          }
        }
    }, [jwt]);


    function handleJWTChange(jwt) {
        setJWT(jwt);
    }

    function logout() {
        setJWT("");
        window.localStorage.removeItem("jwt");
    }

    let loginLink;
    if (jwt === "") {
      loginLink = <Link to="/login">Login</Link>
    } else {
      loginLink = (<Link to="/logout" onClick={logout}>Logout</Link>);
    }

    return (
        <Router>
          <div className='container'>
            <div className='row'>
              <div className="col mt-3">
              <h1 className='mt-3'>Go Watch a Movie!</h1>
              </div>
              <div className="col mt-3 text-end">
                {loginLink}
              </div>
              <hr className='mb-3'></hr>
            </div>
  
            <div className='row'>
              <div className='col-md-2'>
                <nav>
                  <ul className='list-group'>
                    <li className='list-group-item'>
                      <Link to='/'>Home</Link>
                    </li>
                    <li className='list-group-item'>
                      <Link to="/movies">Movies</Link>
                    </li>
                    <li className='list-group-item'>
                      <Link to="/genres">Genres</Link>
                    </li>
                    {jwt !== "" && (
                      <Fragment>
                      <li className='list-group-item'>
                        <Link to="/admin/movie/0">Add movie</Link>
                      </li>
                      <li className='list-group-item'>
                        <Link to='/admin'>Manage Catalog</Link>
                      </li>
                      </Fragment>
                    )}
                    <li className="list-group-item">
                      <Link to='/graphql'>GraphQL</Link>
                    </li>
                  </ul>
                </nav>
              </div>
  
              <div className='col-md-10'>
                <Switch>
                  <Route path='/movies/:id' component={OneMovieFunc} />
                  <Route path='/moviesgraphql/:id' component={OneMovieGraphQL} />
  
                  <Route path='/movies'>
                    <MoviesFunc />
                  </Route>
  
                  <Route path='/genre/:id' component={OneGenreFunc} />
  
                  <Route 
                    exact path='/login' 
                    component={(props) => 
                    <LoginFunc {...props} handleJWTChange={handleJWTChange} /> } 
                  />
  
                  <Route exact path='/genres'>
                    <GenresFunc />
                  </Route>
  
                  <Route exact path='/graphql'>
                    <GraphQL />
                  </Route>
  
                  <Route path='/admin/movie/:id' component={(props) => (
                    <EditMovieFunc {...props} jwt={jwt} />
                  )}
                  />
  
                  <Route
                    path='/admin'
                    component={(props) => (
                      <AdminFunc {...props} jwt={jwt} />
                    )}
                  />
                  
                  <Route path='/'>
                    <Home />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </Router>
    );
}

