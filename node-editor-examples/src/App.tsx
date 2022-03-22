import React from 'react';
import './App.css';
import MainEditor from './components/MainEditor'

function App() {
  return (
    <div className="App">
      <div style={{"height":"100vh"}}>
        <MainEditor />
      </div>
    </div>
  );
}

export default App;
