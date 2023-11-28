"use strict"; // not sure if this is needed in react...

const VendingInsertOrUpdate = (props) => {

    // See if this is an Insert or an Updat by checking the path that invoked this component.
    // If the path has a : in it, then its update, else its insert.
    // If update, extract (from the path) the id of the webUser record that is to be updated. 
    // console.log("props for userInsertOrUpdate on next line");
    // console.log(props);

    var action = "insert"; // exact spelling has to match web API @RequestMapping
    var id = "";
    var url = props.location.pathname;
    console.log("url that invoked VendingInsertOrUpdate is " + url);
    if (url.search(":") > -1) {
        const url_list = url.split(":");
        id = url_list[url_list.length - 1];
        console.log("to update id " + id);
        action = "update";
    } else {
        console.log("to insert");
    }

    // Set initial values of state variables and receive (from React) a setter function for each one.
    // In React, you create State Variables for anything that (if changed) needs to re-render the UI. 

    // Object (State Variable) that holds all the user entered data. Each object 
    // is linked with a textbox for user input. 
    const [userData, setUserData] = React.useState(
        {
            "ID": "",
            "ticketDate": "",
            "image": "",
            "latitude": "",
            "longitude": "",
            "description": "",
            "acceptsBillsAndCoins": "",
            "acceptsEPayments": "",
            "review": "",
            "webUserId": "",
            "vendingTypeId": "",
            "errorMsg": ""
        }
    );

    // State variable to hold the Role List (gotten from getRolesAPI.jsp) 
    // Role List populates the <select tag> for the UI.
    const [roleList, setRoleList] = React.useState([]);
    const [webUserList, setWebUserList] = React.useState([]);
    
    // Object (State Variable) that holds all the error messages - field level 
    // and form/record level (errorMsg).
    const [errorObj, setErrorObj] = React.useState(
        {
            "ID": "",
            "ticketDate": "",
            "image": "",
            "latitude": "",
            "longitude": "",
            "description": "",
            "acceptsBillsAndCoins": "",
            "acceptsEPayments": "",
            "review": "",
            "webUserId": "",
            "vendingTypeId": "",
            "errorMsg": ""
        }
    );

    // This state variable helps control when insertUserAPI should be run
    // (whenever the user clicks submit but NOT initially).
    const [submitCount, setSubmitCount] = React.useState(0);

    // By having this boolean state variable, we avoid rendering the component 
    // before we are ready to do so. 
    const [isLoading, setIsLoading] = React.useState(true);

    const encodeUserInput = () => {
        var userInputObj = {
            "ID": userData.ID,
            "ticketDate": userData.ticketDate,
            "image": userData.image,
            "latitude": userData.latitude,
            "longitude": userData.longitude,
            "description": userData.description,
            "acceptsBillsAndCoins": userData.acceptsBillsAndCoins,
            "acceptsEPayments": userData.acceptsEPayments,
            "review": userData.review,
            "webUserId": userData.webUserId,
            "vendingTypeId": userData.vendingTypeId,
            "errorMsg": userData.errorMsg


        };
        console.log("userInputObj on next line");
        console.log(userInputObj);
        // turn the user input object into JSON then run that through 
        // a URI encoder (needed for security on server side, prevents 
        // server from hacks). 
        //return encodeURIComponent(JSON.stringify(userInputObj));
        return encodeURI(JSON.stringify(userInputObj));
    };

    // If you just change the value of a State object's property, then React does not 
    // know that the object has been changed (and thus does re-render the UI). 
    // To get around this, I wrote function setProp that clones the object, changes 
    // the desired property, then returns the clone. THEN React knows that the object 
    // has been changed (and re-renders the UI). 
    const setProp = (obj, propName, propValue) => {
        var o = Object.assign({}, obj); // makes a copy of the object
        o[propName] = propValue; // changes the property of the copy
        // console.log("setProp orig object is");
        // console.log(obj);
        // console.log("after changing " + propName + " to " + propValue + " the new obj is");
        // console.log(o);
        return o; // returns the object copy with the property's value changed.
    };

    // useEffect second parameter is an array of "watch elements" that 
    // (if they change) should trigger the function specified 
    // as the first useEffect parameter.

    // This code should execute just once at initial page render because 
    // the array of watch elements (second parameter to useEffect) is empty.
    React.useEffect(

        () => {

            console.log("AJAX call for role list");
            ajax_alt("vendingType/getAll",

                function (obj) { // obj holds role list from AJAX call
                    console.log("vendingType/getAll Ajax success");
                    if (obj.dbError.length > 0) {  // db error trying to read role list
                        setErrorObj(setProp(errorObj, "vendingTypeId", obj.dbError));
                    } else {

                        obj.roleList.sort(function (a, b) {
                            var order = 0;
                            //console.log('comparing a '+ a.userRoleType+' with b '+b.userRoleType);
                            if (a.userRoleType > b.userRoleType) {
                                //console.log("a is bigger");
                                order = 1;
                            } else {
                                //console.log("b is bigger");
                                order = -1;
                            }
                            return order;
                        });
                        // obj.roleList.sort(function (a, b) {
                        //     return a.userRoleType > b.userRoleType
                        // });
                        console.log('sorted role list on next line');
                        console.log(obj.roleList);
                        setRoleList(obj.roleList);

                        // UserData.userRoleId gets set whenever the user clicks on the role pick list, 
                        // but we need to set that field (to the id of the top role showing in the pick list) 
                        // so that if the user doesn't click the role pick list and then clicks save, things 
                        // will work. 
                        setUserData(setProp(userData, "vendingTypeId", obj.roleList[0].vendingTypeId)); // FIX
                        console.log("set initial role id for web_user to be " + obj.roleList[0].vendingTypeId);

                        if (action === "update") { //this is update, not insert, get webUser by the id
                            console.log("Now getting tblVendingMachine record " + id + " for the update");
                            ajax_alt("/tblVendingMachine/getById?vendingId=" + id,
                                function (obj) {
                                    if (obj.errorMsg.length > 0) { // obj.errorMsg holds error, e.g., db error
                                        console.log("DB error trying to get the tblVendingMachine record for udpate");
                                        setErrorObj(setProp(errorObj, "errorMsg", obj.errorMsg));
                                        //setProp = (obj, propName, propValue)

                                    } else { // obj holds the webUser record of the given id
                                        console.log("got the web user record for update (on next line)");
                                        console.log(obj);
                                        setUserData(obj); // prepopulate user data since this is update.
                                    }
                                },
                                function (ajaxErrorMsg) { // AJAX Error Msg from trying to read the webUser to be updated.
                                    setErrorObj(setProp(errorObj, "errorMsg", ajaxErrorMsg));
                                }
                            );
                        }

                    }
                },
                function (ajaxErrorMsg) { // AJAX Error Msg from trying to read the role list.
                    // setRoleError(msg);
                    setErrorObj(setProp(errorObj, "errorMsg", ajaxErrorMsg));
                }
            );
            setIsLoading(false);
        }, []);
    React.useEffect(() => {
        console.log("AJAX call for web user list");
        ajax_alt("webUser/getAll",
            function (obj) { // obj holds web user list from AJAX call
                console.log("webUser/getAll Ajax success");
                if (obj.dbError.length > 0) {  // db error trying to read web user list
                    setErrorObj(setProp(errorObj, "webUserId", obj.dbError));
                } else {
                    console.log('web user list on next line');
                    console.log(obj.webUserList);
                    setWebUserList(obj.webUserList);
                    // setUserData(setProp(userData, "webUserId", obj.roleList[0].webUserId)); // FIX


                }
            },
            function (ajaxErrorMsg) { // AJAX Error Msg from trying to read the web user list.
                setErrorObj(setProp(errorObj, "errorMsg", ajaxErrorMsg));
            }
        );
    }, []);



    // This code should execute every time the submit BUTTON is clicked, 
    // but NOT on initial rendering (it checks submitCount). 
    React.useEffect(() => {

        console.log("Here is the user data that will be sent to the insert/update API");
        console.log(userData);

        console.log("SubmitCount has changed, value is " + submitCount);
        if (submitCount > 0) { // dont make the AJAX call on initial render

            // action was set to insert or update above (must match web API @RequestMapping). 
            ajax_alt("tblVendingMachine/" + action + "?jsonData=" + encodeUserInput(),

                function (obj) { // obj holds field level error messages
                    console.log("These are the error messages (next line)");
                    console.log(obj);

                    if (obj.errorMsg.length === 0) {
                        // errorMsg = "" means no error, record was inserted (or updated). 
                        obj.errorMsg = "Record Saved !";
                    }

                    setErrorObj(obj); // show the field level error messages (will all be "" if record was inserted)

                },
                function (ajaxErrorMsg) { // AJAX error msg trying to call the insert or update API
                    setErrorObj(setProp(errorObj, "errorMsg", ajaxErrorMsg));
                }
            );
        }
    }, [submitCount]);

    const validate = () => {
        // In this function, we just change the value of state variable submitCount 
        // so that the React.useEffect (that's watching for changes in submitCount)
        // will run, making the AJAX call.  
        console.log("Validate, should kick off AJAX call");
        setSubmitCount(submitCount + 1);
    };

    if (isLoading) {
        return <div> ... Loading ... </div>;
    }

    return (
        <table className="insertArea">
            <tbody>
                <tr>
                    <td>Id</td>
                    <td>
                        <input value={userData.ID} disabled />
                    </td>
                    <td className="error">
                        {errorObj.ID}
                    </td>
                </tr>
                <tr>
                    <td>ticketDate</td>
                    <td>
                        <input value={userData.ticketDate} onChange=
                            {e => setUserData(setProp(userData, "ticketDate", e.target.value))}
                        />
                    </td>
                    <td className="error">
                        {errorObj.ticketDate}
                    </td>
                </tr>
                <tr>
                    <td>image</td>
                    <td>
                        <input value={userData.image} onChange=
                            {e => setUserData(setProp(userData, "image", e.target.value))}
                        />
                    </td>
                    <td className="error">
                        {errorObj.image}
                    </td>
                </tr>
                <tr>
                    <td>latitude</td>
                    <td>
                        <input type="latitude" value={userData.latitude} onChange=
                            {e => setUserData(setProp(userData, "latitude", e.target.value))}
                        />
                    </td>
                    <td className="error">
                        {errorObj.latitude}
                    </td>
                </tr>
                <tr>
                    <td>longitude</td>
                    <td>
                        <input value={userData.longitude} onChange=
                            {e => setUserData(setProp(userData, "longitude", e.target.value))}
                        />
                    </td>
                    <td className="error">
                        {errorObj.longitude}
                    </td>
                </tr>
                <tr>
                    <td>Description</td>
                    <td>
                        <input value={userData.description} onChange=
                            {e => setUserData(setProp(userData, "description", e.target.value))}
                        />
                    </td>
                    <td className="error">
                        {errorObj.description}
                    </td>
                </tr>
                <tr>
                    <td>acceptsBillsAndCoins</td>
                    <td>
                        <select value={userData.acceptsBillsAndCoins} onChange=
                            {e => setUserData(setProp(userData, "acceptsBillsAndCoins", e.target.value))}
                        >
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                        </select>
                    </td>
                    <td className="error">
                        {errorObj.acceptsBillsAndCoins}
                    </td>
                </tr>
                <tr>
                    <td>acceptsEPayments</td>
                    <td>
                        <select value={userData.acceptsEPayments} onChange=
                            {e => setUserData(setProp(userData, "acceptsEPayments", e.target.value))}
                        >
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                        </select>
                    </td>
                    <td className="error">
                        {errorObj.acceptsEPayments}
                    </td>
                </tr>
                <tr>
                    <td>review</td>
                    <td>
                        {/* create a select from 1 to 5 */}
                        <select onChange=
                            {e => setUserData(setProp(userData, "review", e.target.value))}
                            value={userData.review}
                        >
                            {
                                [1, 2, 3, 4, 5].map(review =>
                                    <option key={review} value={review} >
                                        {review}
                                    </option>
                                )
                            }
                        </select>
                    </td>
                </tr>
                {/* <tr>
                    <td>webUser</td>
                    <td>
                        <input value={userData.webUser} onChange=
                            {e => setUserData(setProp(userData, "webUserId", e.target.value))}
                        />
                    </td>
                    <td className="error">
                        {errorObj.webUserId}
                    </td>

                </tr> */}
                <tr>
                    <td>webUser</td>
                    <td>
                        <select onChange={e => setUserData(setProp(userData, "webUserId", e.target.value))}

                            value={userData.webUserId}
                        >   
                            <option value="">---Select---</option>
                            {
                                webUserList.map(webUser =>
                                    
                                        <option key={webUser.webUserId} value={webUser.webUserId} >
                                        {webUser.userEmail}
                                        </option>
                                    
                                
                                    
                                )
                            }
                        </select>
                    </td>
                    <td className ="error">
                        {errorObj.webUserId}
                    </td>
                </tr>
                <tr>
                    <td>vendingType</td>
                    <td>
                        <select onChange=
                            {e => setUserData(setProp(userData, "vendingTypeId", e.target.value))}
                            value={userData.vendingTypeId}
                        >
                            {
                                roleList.map(role => 
                                  
                                        <option key={role.vendingTypeId} value={role.vendingTypeId} >
                                            {role.vendingTypeDesc}
                                        </option>
                                    
                                )
                            }
                        </select>
                    </td>
                    <td className="error">
                        {errorObj.vendingTypeId}
                    </td>
                </tr>
                {/* <tr>
                    <td>vendingType</td>
                    <td>
                        <input value={userData.vendingType} onChange=
                            {e => setUserData(setProp(userData, "vendingTypeId", e.target.value))}
                        />
                    </td>
                    <td className="error">
                        {errorObj.vendingTypeId}
                    </td>
                </tr> */}
                <tr>
                    <td>
                        <br />
                        <button type="button" onClick={validate}>Save</button>
                    </td>
                    <td className="error" colSpan="2">
                        <br />
                        {errorObj.errorMsg}
                    </td>
                </tr>
            </tbody>
        </table>

    ); // ends the return statement

}; // end of function/component


/* 
 
 Example of web_user StringData output from insertUserAPI.jsp
 
 "webUserId": "1",
 "userEmail": "sallyk",
 "userPassword": "p",
 "userImage": "http://cis-linux2.temple.edu/~sallyk/pics_/sk_2017.jpg",
 "birthday": "",
 "membershipFee": "$123.45",
 "userRoleId": "2",
 "userRoleType": "Edit",
 "errorMsg": ""
 
 */