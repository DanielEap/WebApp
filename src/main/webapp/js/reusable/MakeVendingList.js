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
                <p>Latitude: <span id="latitude">${latitude}</span></p>
                <button class="latitudeAdd">Increase Latitude</button>
                <button class="latitudeSubtract">Decrease Latitude</button>
                <p>Longitude: <span id="longitude">${longitude}</span></p>
                <button class="longitudeAdd">Increase Longitude</button>
                <button class="longitudeSubtract">Decrease Longitude</button>
            </div>
            <p>Description: ${description}</p>
            <div class="reviewClass"> Click to show review
                <p class="reviewClassShow" style="display: none;">Review: ${review} / 5</p>
            </div>
        `;
      
        var vendingInfo = vendingObj.getElementsByClassName("vendingInfoClass")[0];
        var reviewClass = vendingObj.getElementsByClassName("reviewClass")[0];
        var reviewClassShow = vendingObj.getElementsByClassName("reviewClassShow")[0];
        var latitudeAdd = vendingObj.getElementsByClassName("latitudeAdd")[0];
        var latitudeSubtract = vendingObj.getElementsByClassName("latitudeSubtract")[0];
        var longitudeAdd = vendingObj.getElementsByClassName("longitudeAdd")[0];
        var longitudeSubtract = vendingObj.getElementsByClassName("longitudeSubtract")[0];

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
        latitudeAdd.onclick = function(){
            latitude++;
            vendingObj.querySelector("#latitude").innerHTML = latitude;
        }
        latitudeSubtract.onclick = function(){
            latitude--;
            vendingObj.querySelector("#latitude").innerHTML = latitude;
        }
        longitudeAdd.onclick = function(){
            longitude++;
            vendingObj.querySelector("#longitude").innerHTML = longitude;
        }
        longitudeSubtract.onclick = function(){
            longitude--;
            vendingObj.querySelector("#longitude").innerHTML = longitude;
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