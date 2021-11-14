import React from 'react';
import ReactDOM from 'react-dom';

const hello = React.createElement(
    "p",
    {classname = "featured"},
    "Hello"
);

ReactDOM.render(
    hello, 
    document.getElementById("root")
);