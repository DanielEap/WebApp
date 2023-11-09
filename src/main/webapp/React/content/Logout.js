"use strict"
function Logout(){
    const [isLoading, setIsLoading] = React.useState(false);
    const [msg, setMsg] = React.useState("");
    // const [confirm, setConfirm] = React.useState(false);
    function alert(){
        if (window.confirm("Are you sure you want to logout?")) {
            confirmLogout();
        }
    }
    function confirmLogout(){
        setIsLoading(true);
        var url = "session/logout";
        console.log("onclick function will call ajax_alt with url: " + url);
        setMsg("findClick was called (testing)"); 

        ajax_alt(
            url,
            function (obj) {
                console.log("Ajax Success - got object (see next line).");
                console.log(obj);
                if (obj.errorMsg.length > 0) {
                    setMsg(<strong>{obj.errorMsg}</strong>);
                    console.log("error message: " + obj.errorMsg);
                } else {
                    setMsg(
                        <div>
                            <h2>Logout Successful</h2>
                        </div>
                    );
                }
                setIsLoading(false);
                console.log("message:" + msg);
            },
            function (errorMsg) {
                console.log("AJAX error. Here's the message: " + errMsg);
                setMsg("ajax failure: " + errorMsg);
                setIsLoading(false);
            }
        );
    }
    return(
        <div class="logout">
            <h1>Logout</h1>
            <span>
                <button onClick ={alert}>Logout</button>
            </span>
            <div>{msg}</div>
        </div>
    );
}