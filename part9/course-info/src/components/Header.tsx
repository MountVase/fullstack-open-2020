import React from 'react';

interface headerProps {
    courseName: string;
}

const Header: React.FC<headerProps> = (props) => {
    return (
        <h1>{props.courseName}</h1>
    )
};

export default Header;