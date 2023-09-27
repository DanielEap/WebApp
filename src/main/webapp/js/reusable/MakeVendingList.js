//non-react reusable function
// add a parameter to show up on the ui
function MakeVendingList({vendingList=null, title="Vending Listing",image="pics/Map.png" }){
    if(vendingList === null){
        //return a div with error message
        return <div>ERROR: No Vending List</div>;
    }
    //javascript templating 
    function MakeVending({vendingImage=null, latitude=90, longitude=180, description="", review=5}){
        var vendingObj = document.createElement("div");
        vendingObj.classList.add("vending");

    }

    var vendingListComp = document.createElement("div");
    vendingListComp.classList.add("vendingList");
    vendingListComp.innerHTML = `<h2${title}</h2>`;

    for(var vendingObj of vendingList){
        vendingListComp.appendChild(MakeVending(vendingObj));
    }

    return vendingListComp;
}