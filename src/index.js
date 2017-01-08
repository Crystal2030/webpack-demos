import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Button from './components/Button/Button';

/*
class HelloWorld extends Component{
	render(){
		return(
			<h1> Hello World </h1>
		)
	}
}
*/

let root = document.getElementById('app');
ReactDOM.render(<Button/>, root);