import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import HomeMain from './Components/HomeMain';
import Forecast from './Components/Forecast';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<HomeMain />} />
            <Route path='/weather-forecast' element={<Forecast />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App

