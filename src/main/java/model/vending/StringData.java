package model.vending;
public class StringData {
    public String ID = "";     // auto-increment primary key
    // public String ticketID = "";     // varChar 45, must be unique
    public String ticketDate = "";  // DATE, NN
    public String image ="";        //varChar
    public String latitude = "";    // DECIMAL(9,7), NN
    public String longitude = ""; // DECIMAL(10,7), NN
    public String description = "";     // varChar 
    public String acceptsBillsAndCoins = ""; //tinyInt
    public String acceptsEPayments = ""; //tinyInt
    public String review = ""; // double
    public String webUserID = ""; //int
    public String vendingTypeDesc = ""; //varchar
    public String userEmail = ""; //varchar
    public String errorMsg = "";      // not actually in the database, use
                                      // to convey success or failure.    
}
