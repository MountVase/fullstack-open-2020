import React from 'react';

interface coursePart {
    name: string;
    exerciseCount: number;
}

type contentProps = {
    courseParts: coursePart[];
}


const Content: React.FC<contentProps> = (props) => {
    return (
        <>
        {props.courseParts.map(part => {
            return <p key={part.name}>{part.name}   {part.exerciseCount}</p>
        })}
        </>
    )
}

export default Content