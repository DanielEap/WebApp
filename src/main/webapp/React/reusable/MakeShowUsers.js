function MakeShowUsers({titleText = "Default Title"}){
    const UserSortAndFilter = () => {

        console.log("UserSortTable running !!");
    
        // Tell React that 'items' (an array of objects) is a state variable 
        // that (when changed by the React provided setter function 'setItems')
        // should redisplay this component. Set its initial value to [], an empty array.
        const [items, setItems] = React.useState([]);
    
        // Tell React that "error" is a state variable that (when changed by the React 
        // provided setter function 'setError') should redisplay this component. 
        // Set its initial value to null.
        const [error, setError] = React.useState(null);
    
        // Common React pattern. Display a "...Loading..." UI while the page
        // is loading. Then when data gets ready, render the component. 
        const [isLoading, setIsLoading] = React.useState(true);
    
            // 'filterItems' will hold the dbItems as filtered after the user clicks the search button. 
        // initial value is [] (empty array)
        const [filterInput, setFilterInput] = React.useState("");
    
        // useEffect takes two params. The first param is the function to be run. 
        // The second param is a list of state variables that (if they change) will 
        // cause the function (the first param) to be run again.
        //
        // If your list of state variables is empty, then whatever you put for the first 
        // param (of useEffect) gets run just once (and not every time any state variable 
        // changes. 
    
        React.useEffect(
            () => {
    
                // ajax_alt takes three parameters: the URL to read, Success Fn, Failure Fn.
                ajax_alt(
    
                    //NOTE: this only has the ../ because the code is in a subfolder... 
                    "../webUser/getAll", // URL for AJAX call to invoke
    
                    function (dbList) {   // ajax_alt calls this function if ajax call successful 
                        setIsLoading(false);
                        if (dbList.dbError.length > 0) { // ajax can be successful but still report a db error.
                            setError("Database Error. " + dbList.dbError);
                        } else {
                            console.log("in AjaxUserTable here is web user list (next line):");
                            console.log(dbList.webUserList);
                            setItems(dbList.webUserList);
                        }
                    },
                    function (errorMsg) { // ajax_alt calls this function if ajax call fails
                        setIsLoading(false);
                        setError("AJAX Error: " + errorMsg);
                    }
                );
    
            },
            [] // list of state variables. empty means run just once
        );
    
        const doFilter = () => {
      
            let newItems = filterObjList(items, filterInput);
            console.log("doFilter, filterInputVal is: " + filterInput +
                ". See filtered list on next line:");
            console.log(newItems);
            setItems(newItems);
        };
    
        function sortByProp(propName, sortType) {
            var newItems = copyList(items);
    
            // sort the original user list based on property name and type
            jsSort(newItems, propName, sortType);
            console.log("Sorted list is below");
            console.log(newItems);
    
            // if you dont set the sorted list with a newly made copy, 
            // React wont re-render the component. 
            setItems(newItems);
        }
    
        
        if (isLoading) {
            return <div> Loading... </div>
        }
    
        if (error != null) {
            return <div>
                <h3> {error} (error)</h3>
            </div>
        }
    
        // NOTE: onClick in react has a capital C, unlike regular JS onclick (no capital C).
        return (
            <div className="clickSort">
                <h3>(Sortable) Web User List
                <input value={filterInput} onChange={(e) => setFilterInput(e.target.value)} />
                    &nbsp; <button onClick={() => doFilter()}>Search</button>
                </h3>
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => sortByProp("userEmail", "text")} >
                                <img src="assets/sortDown.png" />Email
                            </th>
                            <th className="textAlignCenter">Image</th>
                            <th onClick={() => sortByProp("birthday", "date")}
                                className="textAlignCenter">
                                <img src="assets/sortDown.png" />Birthday
                            </th>
                            <th onClick={() => sortByProp("membershipFee", "number")}
                                className="textAlignRight" >
                                <img src="assets/sortDown.png" />Membership Fee
                            </th>
                            <th onClick={() => sortByProp("userRoleType", "text")}>
                                <img src="assets/sortDown.png" />Role
                            </th>
                            <th>Error</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((listObj) =>
                                <tr key={listObj.webUserId}>
                                    <td>{listObj.userEmail}</td>
                                    <td className="shadowImage textAlignCenter"><img src={listObj.userImage} /></td>
                                    <td className="textAlignCenter">{listObj.birthday}</td>
                                    <td className="textAlignRight">{listObj.membershipFee}</td>
                                    <td className="nowrap">{listObj.userRoleType}</td>
                                    <td>{listObj.errorMsg}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
        
    };
    return (
        <div className="clickSort">
            <h3>{titleText}</h3>
            <UserSortAndFilter />
        </div>
    );
}