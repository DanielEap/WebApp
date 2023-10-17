"use strict"
function ShowVending(){
    var title = "Vending Machines";
    ReactDOM.render(
        <MakeShowVending titleText={title} />,
        document.getElementById("reactTables")
    )
}