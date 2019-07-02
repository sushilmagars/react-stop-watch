import React from 'react';

export default function Button(props) {
  return (
    <button 
      className="action-buttons"
      onClick={() => props.buttonClickHandler(props.buttonText)}
    >{props.buttonText}</button>
  );
}