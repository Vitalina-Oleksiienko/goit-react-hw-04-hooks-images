import { Component } from "react";
import PropTypes from 'prop-types';

export default class Button extends Component {
    hendleClick = () => {
        return this.props.onClick(1);
    };

    render() {
        return (
            <button onClick={this.hendleClick} className="Button" type="button">Load more</button>
        )
            
    }
}

Button.propTypes = {
    onClick: PropTypes.func,
}