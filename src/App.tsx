import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalNavComponent from "./infraestructure/components/globalNavBar.component";
import SpeedCalculatorPage from "./domains/attributes/pages/speedCalculator.page";

function App() {
  return (
    <div className="App">
      <GlobalNavComponent/>
      <Routes>
        <Route path="/atk-speed" element={<SpeedCalculatorPage />} />
      </Routes>
    </div>
  );
}

export default App;
