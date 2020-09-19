import React from 'react';
import Footer from './layout/footer.js';
import Header from './layout/header.js';
import MainFunction from './components/mainFunction.js';
import './App.css';

function App() {
  	return (
	  	<div className="App">
			<Header />
			<MainFunction />
			<Footer />
	  	</div>
  	);
}

export default App;
