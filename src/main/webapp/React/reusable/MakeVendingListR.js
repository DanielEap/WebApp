//react reusable

function MakeVendingListR({ vendingList = null, title = "Vending Listing", image = "pics/Vending3.jpg" }) {
    if (vendingList == null) {
        return (
            <div className="error">
                <h1>REACT Error: No vending List provided</h1>
            </div>
        );
    }

    function MakeVendingR({ vendingObj }) {
        const [review, setReview] = React.useState(5);
        const [description, setDescription] = React.useState("");
        const [latitude, setLatitude] = React.useState(90);
        const [longitude, setLongitude] = React.useState(180);
        const [vendingImage, setVendingImage] = React.useState("pics/Vending4.png");
        const [showReview, setShowReview] = React.useState(false);
        const vendingInfo = React.useRef(null);
        const reviewClassShow = React.useRef(null);
        React.useEffect(() => {
            vendingInfo.current.innerHTML = `
                <img src="${vendingImage}" alt="Vending Image">
            `;
        }, [vendingImage]);
        React.useEffect(() => {
            reviewClassShow.current.innerHTML = `Review: ${review} / 5`;
        }, [review]);
        React.useEffect(() => {
            if (showReview) {
                reviewClassShow.current.style.display = "block";
            } else {
                reviewClassShow.current.style.display = "none";
            }
        }, [showReview]);
        return (
            <div className="vending">
                <div className="vendingInfoClass" ref={vendingInfo}></div>
                <div className="coordinatesClass">
                    <p>Latitude: {latitude}</p>
                    <p>Longitude: {longitude}</p>
                </div>
                <p>Description: {description}</p>
                <div className="reviewClass" onClick={() => { setShowReview(!showReview) }}>
                    Click to show review
                    <p className="reviewClassShow" ref={reviewClassShow} style={{ display: "none" }}></p>
                </div>
            </div>
        );

    }
    return (
        <div className="vendingList">
            <span><h2>{title}</h2> <img src={image} alt="Vending Image"></img></span>
            {vendingList.map((vending) => (
                <MakeVendingR key={vending.id} vendingObj={vending} />
            ))}
        </div>
    );
}