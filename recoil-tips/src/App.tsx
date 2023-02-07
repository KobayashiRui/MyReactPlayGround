import React from 'react';
import logo from './logo.svg';
import './App.css';
import AtomTips1 from './components/atom_tips1';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
    <div className="App">
      <AtomTips1></AtomTips1>
    </div>
    </RecoilRoot>
  );
}

export default App;
