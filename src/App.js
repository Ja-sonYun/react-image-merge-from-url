import React from 'react';
import Footer from './layout/footer.js';
import Header from './layout/header.js';
import Translator from './components/translator.js';
import './App.css';

function App() {
  	return (
	  	<div className="App">
			<Header />
			<Translator />
			<Footer />
	  	</div>
  	);
}

export default App;
