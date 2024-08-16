import React, { Component } from 'react';

class Button extends Component {
    render() {
        const { onClick, label, color = '#004aad', textColor = '#ffffff', fontSize = '16px', padding = '10px 20px', borderRadius = '5px', fontFamily = 'Segoe, sans-serif', style } = this.props;

        return (
            <button
                onClick={onClick}
                style={{
                    backgroundColor: color,
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
