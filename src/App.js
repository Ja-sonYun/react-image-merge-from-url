import React from 'react';
import Footer from './layout/footer.js';
import Header from './layout/header.js';
import MainFunction from './components/mainFunction.js';
import './App.css';

function App() {
	const [lan, setLan] = React.useState('en');
	const setLanguage = (lan) => {
		setLan(lan);
	};

  	return (
	  	<div className="App">
			<Header setLan={ setLanguage } lan={lan}/>
			<MainFunction lan={lan}/>
			<Footer/>
	  	</div>
  	);
}

export default App;
