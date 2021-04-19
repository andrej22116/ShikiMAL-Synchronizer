import React, { useState } from "react";

const Score = ({score, setScore}) => {
    const [isOver, setIsOver] = useState(false);
    const [overScore, setOverScore] = useState(1);

    score = isOver ? overScore + 1 : score;
    const res = [];
    for ( let i = 0; i < 10; i++ ) {
        res.push(
            <i 
                title={`Click for set ${i + 1} score`}
                key={i}
                className={(i < score ? "icon-star" : "icon-star-empty")}
                onMouseEnter={() => {
                    setIsOver(true);
                    setOverScore(i);
                }}
                onMouseOut={() => {
                    setIsOver(false);
                }}
                onClick={() => setScore(overScore + 1)}
            >
            </i>
        );
    }
    return (
        <div 
            className="score"
            onMouseOver={() => setIsOver(true)}
            onMouseOut={() => setIsOver(false)}
        >
            {res}
            <span>{isOver ? overScore + 1 : score}</span>
        </div>
    );
};

export default Score;