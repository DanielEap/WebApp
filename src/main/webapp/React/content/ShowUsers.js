"use strict"
function ShowUsers(){
    var title = "Users Table";
    ReactDOM.render(
        <MakeShowUsers titleText={title} />,
        document.getElementById("react1")
    )
}