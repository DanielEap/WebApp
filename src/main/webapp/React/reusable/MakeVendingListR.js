function MakeVendingListR({ vendingList = null, title = "Vending Listing", image = "pics/Vending3.jpg" }) {
    if (vendingList == null) {
        return (
            <div className="error">
                <h1>REACT Error: No vending List provided</h1>
            </div>
        );
    }

    function MakeVendingR({ vendingObj }) {
        const [review, setReview] = React.useState(vendingObj.review);
        const [description, setDescription] = React.useState(vendingObj.description);
        const [latitude, setLatitude] = React.useState(vendingObj.latitude);
        const [longitude, setLongitude] = React.useState(vendingObj.longitude);
        const [vendingImage, setVendingImage] = React.useState(vendingObj.vendingImage);
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
                    <button onClick={() => setLatitude(latitude + 1)}>Increase Latitude</button>
                    <button onClick={() => setLatitude(latitude - 1)}>Decrease Latitude</button>
                    <p>Longitude: {longitude}</p>
                    <button onClick={() => setLongitude(longitude + 1)}>Increase Longitude</button>
                    <button onClick={() => setLongitude(longitude - 1)}>Decrease Longitude</button>
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