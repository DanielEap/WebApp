package model.vending;

public class StringData {
    public String ID = ""; // auto-increment primary key

    public String ticketDate = ""; // DATE, NN
    public String image = ""; // varChar
    public String latitude = ""; // DECIMAL(9,7), NN
    public String longitude = ""; // DECIMAL(10,7), NN
    public String description = ""; // varChar
    public String acceptsBillsAndCoins = ""; // tinyInt
    public String acceptsEPayments = ""; // tinyInt
    public String review = ""; // double
    public String webUserID = ""; // int
   
    public String userEmail = ""; // varchar
    public String vendingTypeID = ""; // int
    public String vendingTypeDesc = ""; // varchar
    public String errorMsg = ""; // not actually in the database, use
                                 // to convey success or failure.

    public int characterCount() {
        String s = this.ID+ this.ticketDate + this.image +
         this.latitude + this.longitude + this.description +
          this.acceptsBillsAndCoins + this.acceptsEPayments + 
          this.review + this.webUserID + this.userEmail + 
          this.vendingTypeID + this.vendingTypeDesc;
        return s.length();
    }

    // not required, can be useful for debugging, e.g.,
    // System.println(sdObj.toString());
    public String toString() {
        return "ID:" + this.ID + 
        ", Ticket Date: " + this.ticketDate + 
        ", Image: " + this.image + 
        ", Latitude: "+ this.latitude + 
        ", Longitude: " + this.longitude + 
        ", Description: " + this.description + 
        ", Accepts Bills And Coins: " + this.acceptsBillsAndCoins + 
        ", Accepts E Payments: "+ this.acceptsEPayments + 
        ", Review: " + this.review +
        ", Web User ID: " + this.webUserID +
        ", User Email: " + this.userEmail +
        ", Vending Type ID: " + this.vendingTypeID +
        ", Vending Type Desc: " + this.vendingTypeDesc;
        
        // ", User Email: " + this.userEmail;
        
    }
}
