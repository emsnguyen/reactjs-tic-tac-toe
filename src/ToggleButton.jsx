import React from "react";
function ToggleButton(props) {
    return (
        <button 
            onClick={()=>props.onClick(props.value)}>
                Sort {props.value ? "descending" : "ascending"}
        </button>
    );
}
export default ToggleButton;
