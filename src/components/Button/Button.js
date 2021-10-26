import PropTypes from 'prop-types';

export default function Button({onClick}) {
   const hendleClick = () => {
        return onClick(1);
    };

        return (
            <button onClick = { hendleClick } 
                    className = "Button" 
                    type = "button" > Load more</button>
        )
            
    }


Button.propTypes = {
    onClick: PropTypes.func,
}