import React, { Component } from 'react';

class Button extends Component{
	handleClick = () => alert('why do you click me');

	render(){
		const style = require('./Button.less');

		return (
			<button className="my-button" onClick={this.handleClick()}>Click me!</button>
		)
	}
}

export default Button;