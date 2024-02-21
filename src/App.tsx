import React from 'react';
// import { Person } from './Componenets/Person';
// import { country } from './Componenets/Person';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import { Main } from './Pages/Main';
import Nav from './Componenets/Nav/Nav';

function App() {
  return (
  //   <div className="App">
  //    <Person
  //    name="Josey"
  //    email="ewijosepha@gmail.com"
  //    age={26}
  //    isMarried={ true}
  //    friends ={["grace" ,"glory", "ynes", "vans"]}
  //    country={country.France}
  //  />
  //  </div>

  <Router>
    <Nav />
    <Routes>
      <Route path="/"  element={<Main />} />
      <Route path="/"  element={<Main />} />
      <Route path="/login"  element={<Login />} />
    </Routes>
  </Router>
  );
}

export default App;
