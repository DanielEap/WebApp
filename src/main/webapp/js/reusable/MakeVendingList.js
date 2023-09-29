//non-react reusable function
// add a parameter to show up on the ui
function MakeVendingList({vendingList=null, title="Vending Listing",image="pics/Vending3.jpg" }){
    if(vendingList === null){
        //return a div with error message
        var errorDiv = document.createElement("div");
        errorDiv.innerHTML = "<h1>Error: No Vending List Provided</h1>";
        return errorDiv;
    }
    //javascript templating 
    function MakeVending({vendingImage="pics/Vending4.png", latitude=90, longitude=180, description="", review=5}){
        var vendingObj = document.createElement("div");
        vendingObj.classList.add("vending");

        // vendingObj.setReview = function(newReview){
        //     review = newReview;
        //     display();
        // }
        // vendingObj.setDesc = function(newDesc){
        //     description = newDesc;
        //     display();
        // }
        //add change for description and review
        vendingObj.innerHTML = `
            <div class="vendingInfoClass"></div>
          
            <div class="coordinatesClass">
                <p>Latitude: ${latitude}</p>
                <p>Longitude: ${longitude}</p>
            </div>
            <p>Description: ${description}</p>
            <div class="reviewClass"> Click to show review
                <p class="reviewClassShow" style="display: none;">Review: ${review} / 5</p>
            </div>
        `;
      
        var vendingInfo = vendingObj.getElementsByClassName("vendingInfoClass")[0];
        var reviewClass = vendingObj.getElementsByClassName("reviewClass")[0];
        var reviewClassShow = vendingObj.getElementsByClassName("reviewClassShow")[0];
      
        var display = function(){
            vendingInfo.innerHTML = `
            <img src="${vendingImage}" alt="Vending Image">
          `;
        };
        display();
        reviewClass.onclick = function(){
            if(reviewClassShow.style.display === "none"){
                reviewClassShow.style.display = "block";
            }else{
                reviewClassShow.style.display = "none";
            }
        }
        console.log(typeof(vendingObj));
        return vendingObj;
    }

    var vendingListComp = document.createElement("div");
    vendingListComp.classList.add("vendingList");
    vendingListComp.innerHTML = `<span><h2>${title}</h2> <img src="${image}" alt="Vending Image"></span>`;


    for(var vendingObj of vendingList){
       
        vendingListComp.appendChild(MakeVending(vendingObj));
    }
    console.log("vendingListComp " + typeof(vendingListComp));
    return vendingListComp;
}