import React from "react"

export default function Squares(props) {

    return (
        <button className="square" onClick={props.handleClick}>
            {props.value}
        </button>
    )

}