"use strict";

function dropDownFW(params) {
    
    var dropHeaderStyle = params.dropHeaderStyle; 
    var dropContentStyle = params.dropContentStyle;
    var showStyle = params.showStyle;
    var hideStyle = params.hideStyle;

    window.onclick = function (event) {

        var clickedEle = event.target;  // this is the DOM element (anywhere on page) that was clicked.
        // console.log("clickedEle on next line");
        // console.log(clickedEle);

        if (clickedEle.classList.contains(dropHeaderStyle)) {

            var nextEle = clickedEle.parentElement.getElementsByClassName(dropContentStyle)[0];
            // console.log("nextEle on next line");
            // console.log(nextEle);

            if (nextEle.classList.contains(showStyle)) {
                hide(nextEle);
            } else {
                show(nextEle);
            }

        } else {

            // This is when they click anywhere on the page (not a dropHeader).
            var dropContentList = document.getElementsByClassName(dropContentStyle);
            for (var i = 0; i < dropContentList.length; i++) {
                dropContentList[i].classList.remove(showStyle);
                dropContentList[i].classList.add(hideStyle);
            }
        }

        // private function defined inside of another function
        function hide(ele) {
            ele.classList.remove(showStyle);
            ele.classList.add(hideStyle);
        }

        // private function defined inside of another function
        function show(ele) {
            ele.classList.remove(hideStyle);
            ele.classList.add(showStyle);
        }
    };  // window.onclick function 
}