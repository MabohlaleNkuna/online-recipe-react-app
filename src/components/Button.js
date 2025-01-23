import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false,
            isClicked: false,
        };
    }

    handleMouseEnter = () => {
        this.setState({ isHovered: true });
    };

    handleMouseLeave = () => {
        this.setState({ isHovered: false });
    };

    handleMouseDown = () => {
        this.setState({ isClicked: true });
    };

    handleMouseUp = () => {
        this.setState({ isClicked: false });
    };

    render() {
        const { onClick, label, color = '#004aad', textColor = '#ffffff', fontSize = '16px', padding = '10px 20px', borderRadius = '5px', fontFamily = 'Segoe, sans-serif', style } = this.props;
        const { isHovered, isClicked } = this.state;

        // Define styles for hover and click states
        const hoverColor = isHovered ? '#005bb5' : color;  // Darker color on hover
        const activeColor = isClicked ? '#003f7f' : hoverColor;  // Even darker color when clicked

        return (
            <button
                onClick={onClick}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                style={{
                    backgroundColor: activeColor,
                    color: textColor,
                    fontSize: fontSize,
                    padding: padding,
                    borderRadius: borderRadius,
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: fontFamily,
                    ...style,
                }}
            >
                {label}
            </button>
        );
    }
}

export default Button;
