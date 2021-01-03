import React from 'react';

interface coursePart {
    name: string;
    exerciseCount: number;
}

type totalProps = {
    courseParts: coursePart[];
}

const Total: React.FC<totalProps> = (props) => {
    return (
         <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    )
}


export default Total