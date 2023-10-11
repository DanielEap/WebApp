package view;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import model.vending.*;
import dbUtils.*;

public class VendingView {

    public static StringDataList getAllUsers(DbConn dbc) {

        // sdl will be an empty array and DbError with "" 
        StringDataList sdl = new StringDataList(); 

        sdl.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.
        if (sdl.dbError.length() > 0) {
            return sdl; // cannot proceed, db error (and that's been recorded in return object).
        }
        
        // sd will have all of it's fields initialized to ""
        StringData sd = new StringData();
        
        try {
            String sql = "SELECT ID, ticketID, ticketDate, image, latitude, longitude, description, acceptsBillsAndCoins, acceptsEPayments, review, web_user.web_user_id, vending_type_desc, user_email "
                    + "FROM tblVendingMachine, web_user, vending_type where tblVendingMachine.web_user_id = web_user.web_user_id and tblVendingMachine.vending_type_id = vending_type.vending_type_id "
                    + "ORDER BY ID";  // always order by something, not just random order.
            
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                
                sd = new StringData();
                
                // the Format methods do not throw exceptions. If they find illegal data (like you 
                // tried to format a date as an integer), they return an error message (instead of 
                // returning the formatted value). So, you'll see these error messages right in the 
                // API output (JSON data) and/or you'll see it on the page in the UI.

                sd.ID = Format.fmtInteger(results.getObject("ID"));
                sd.ticketID = Format.fmtString(results.getObject("ticketID"));
                sd.ticketDate = Format.fmtDate(results.getObject("ticketDate"));
                sd.image = Format.fmtString(results.getObject("image"));
                sd.latitude = Format.fmtDecimal(results.getObject("latitude"));
                sd.longitude = Format.fmtDecimal(results.getObject("longitude"));
                sd.description = Format.fmtString(results.getObject("description"));
                sd.acceptsBillsAndCoins = Format.fmtBoolean(results.getObject("acceptsBillsAndCoins"));
                sd.acceptsEPayments = Format.fmtBoolean(results.getObject("acceptsEPayments"));
                sd.review = Format.fmtDecimal(results.getObject("review"));
                sd.webUserID = Format.fmtInteger(results.getObject("web_user_id"));
                sd.vendingTypeDesc = Format.fmtString(results.getObject("vending_type_desc"));
                sd.userEmail = Format.fmtString(results.getObject("user_email"));
                sdl.add(sd);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in VendingView.getAllUsers(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}
