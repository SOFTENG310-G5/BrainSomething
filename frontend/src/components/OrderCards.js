import '../styles/HackPuzzle.css';
import React from "react";

const OrderCards = ({first, second, third, fourth}) => {
    return (
        <div className="card-collection">
            <div className="puzzle-card">
                <div className="number">{first}</div>
            </div>
            <div className="puzzle-card">
                <div className="number">{second}</div>
            </div>
            <div className="puzzle-card">
                <div className="number">{third}</div>
            </div>
            <div className="puzzle-card">
                <div className="number">{fourth}</div>
            </div>
        </div>
    )
}

export default OrderCards;