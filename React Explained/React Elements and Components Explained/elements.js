import React from 'react';
import ReactDOM from 'react-dom';

function Welcome(){
    return React.createElement(
        "h1",
        { className: "welcome" },
        React.createElement(
            "a",
            {href: "http://reactjs.org" },
            "Welcome!"
        )
    );
}

function Footer() {
    return React.createElement(
        "footer",
        {className: "entry-footer"},
        Divider(),
        React.createElement("p", {}, "GoodBye")
    );
}

function Divider() {
    return React.createElement("hr");
}

// Can also be arrow functions
// const App = () => (...)
function App() {
    return React.createElement(
        "article",
        { className: "post" },
        Welcome(),
        Divider(),
        React.createElement(
            "div",
            {className: "entry-content"},
            React.createElement("p", {}, "Main content")
        ),
        Footer()
    );
}

ReactDOM.render(
    App(),
    document.getElementById("root")
);