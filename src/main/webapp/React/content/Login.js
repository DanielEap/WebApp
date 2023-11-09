"use strict"
function Login(){
    const [isLoading, setIsLoading] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState("");
    const [userPass, setUserPass] = React.useState("");
    const [msg, setMsg] = React.useState("");
    function checkLogin(){
        setIsLoading(true);

        var url = "session/login?email=" + encodeURI(userEmail) + "&pwd=" + encodeURI(userPass);
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
                            <h2>Welcome Web User {obj.webUserId} </h2>

                            Birthday: {obj.birthday} <br />
                            Membership Fee: {obj.membershipFee} <br />
                            User Role: {obj.userRoleId} {obj.userRoleType} <br />
                            <img src={obj.userImage} />
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
        <div class="login">
            <h1>Login</h1>
            <span>
                <label for="emailInput">User Email Address </label>
                <input value={userEmail} id="emailInput" onChange={(e) => setUserEmail(e.target.value)}></input> &nbsp;
                <label for="passInput">Password </label>
                <input value={userPass} id="passInput"type="pass" onChange={(e) => setUserPass(e.target.value)}></input> &nbsp;
                <button onClick ={checkLogin}>Submit</button>
            </span>
            <div>{msg}</div>
        </div>
    );
}