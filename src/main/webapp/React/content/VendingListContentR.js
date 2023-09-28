"use strict";
function VendingListContentR() {
    var FoodVendingList = [
        { vendingImage: "pics/FoodVending/1.jpg", latitude: 39.9526, longitude: -75.1652, description: "This is a food vending machine", review: 5 },
        { vendingImage: "pics/FoodVending/2.jpg", latitude: 49.9526, longitude: -25.1652, description: "This is a VERY GOOD food vending machine", review: 4 },
        { vendingImage: "pics/FoodVending/3.jpg", latitude: 40.9526, longitude: -116.1652, description: "This is a bad food vending machine", review: 3 },
    ];
    var test1VendingList = [
        {},
        {},
        {},
    ]
    ReactDOM.render(
        <MakeVendingListR vendingList={FoodVendingList} title="Food Vending List" image="pics/FoodVending/apple.jpg" />,
        document.getElementById("react1")
    );
    ReactDOM.render(
        <MakeVendingListR vendingList={test1VendingList} />,
        document.getElementById("react2")
    );
    ReactDOM.render(
        <MakeVendingListR />,
        document.getElementById("react3")
    );
}