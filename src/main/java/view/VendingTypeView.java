package view;
import model.vendingType.*;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import dbUtils.*;

public class VendingTypeView {
    public static StringDataList getAllVendingTypes(DbConn dbc) {

        // sdl will have two properties, a DbError (initially set to "") and an empty array. 
        StringDataList sdl = new StringDataList();

        sdl.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.
        if (sdl.dbError.length() > 0) {
            return sdl; // cannot proceed, db error (and that's been recorded in return object).
        }
        
        try {
            String sql = "SELECT vending_type_id, vending_type_desc FROM vending_type ORDER BY vending_type_id";  // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {

                StringData vendingType = new StringData();
                vendingType.vendingTypeId = Format.fmtInteger(results.getObject("vending_type_id"));
                vendingType.vendingTypeDesc = Format.fmtString(results.getObject("vending_type_desc"));

                sdl.add(vendingType);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in VendingTypeView.allTypesAPI(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}
