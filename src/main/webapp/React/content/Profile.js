"use strict"
function Profile(){
    const [isLoading, setIsLoading] = React.useState(false);
    const [msg, setMsg] = React.useState("");
    function readLogin(){
        setIsLoading(true);
        var url = "session/read";
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
                            <h2>Welcome Back Web User {obj.webUserId} </h2>

                            Birthday: {obj.birthday} <br />
                            Membership Fee: {obj.membershipFee} <br />
                            User Role: {obj.userRoleId} {obj.userRoleType} <br />
                            <p> <img src={obj.userImage} /> </p>
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
    React.useEffect(() => {
        readLogin();
    }, []);
    return(
        <div class="profile">
            <h1>Profile</h1>
            <div>{msg}</div>
        </div>
    )
}