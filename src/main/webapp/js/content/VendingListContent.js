//non react content generating function
"use strict"
function VendingListContent() {
    var destEle = document.getElementById("content");

    var FoodVendingList = [
        { vendingImage: "pics/FoodVending/1.jpg", latitude: 39.9526, longitude: -75.1652, description: "This is a food vending machine", review: 5 },
        { vendingImage: "pics/FoodVending/2.jpg", latitude: 49.9526, longitude: -25.1652, description: "This is a VERY GOOD food vending machine", review: 4 },
        { vendingImage: "pics/FoodVending/3.jpg", latitude: 40.9526, longitude: -116.1652, description: "This is a bad food vending machine", review: 3 },
    ];
    var FoodVendingComp = MakeVendingList({
        vendingList: FoodVendingList,
        title: "Food Vending List",
        image: "pics/FoodVending/apple.jpg"
    });
    destEle.appendChild(FoodVendingComp);

    // var DrinkVendingList = [
    //     {vendingImage:"pics/DrinkVending/1.jpg", latitude:39.9526, longitude:-75.1652, description:"This is a drink vending machine", review:5},
    //     {vendingImage:"pics/DrinkVending/2.jpg", latitude:49.9526, longitude:-85.1652, description:"This is a VERY GOOD drink vending machine", review:4},
    //     {vendingImage:"pics/DrinkVending/3.jpg", latitude:40.9526, longitude: 75.1652, description:"This is a bad drink vending machine", review:3},
    // ];

    // var DrinkVendingComp = MakeVendingList({
    //     vendingList:DrinkVendingList, 
    //     title:"Drink Vending List",
    //     image:"pics/DrinkVending/juicebox.jpg"
    // });
    // destEle.appendChild(DrinkVendingComp);

    // var ToyVendingList = [
    //     {vendingImage:"pics/ToyVending/1.jpg", latitude:39.9526, longitude:-75.1652, description:"This is a Great toy vending machine", review:5},
    //     {vendingImage:"pics/ToyVending/2.jpg", latitude:29.9526, longitude:-15.1652, description:"This is a VERY GOOD toy vending machine", review:4},
    //     {vendingImage:"pics/ToyVending/3.jpg", latitude:10.9526, longitude: 16.4452, description:"This is a bad toy vending machine", review:3},
    // ];

    // var ToyVendingComp = MakeVendingList({
    //     vendingList:ToyVendingList, 
    //     title:"Toy Vending List",
    //     image:"pics/ToyVending/Buzz.jpg"
    // });
    // destEle.appendChild(ToyVendingComp);

    //invoke the make vending list function but provide the object list but do not provide any other properties

    var test1VendingList = [
        {},
        {},
        {},
    ]
    var test1VendingListComp = MakeVendingList({ vendingList: test1VendingList });
    destEle.appendChild(test1VendingListComp);

    //call the make list function but provide an empty object (no object list property, no other properties )
    var test2VendingListComp = MakeVendingList({});
    destEle.appendChild(test2VendingListComp);
}
