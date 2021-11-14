function Welcome() {
    return React.createElement(
        "h1",
        {className: "welcome"},
        React.createElement(
            "a",
            {href: "httpts://reactjs.org/"},
            "Welcome!"
            )
    );
}

ReactDOM.render(
    Welcome(),
    document.getElementById("root")
);