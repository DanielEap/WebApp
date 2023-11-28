package model.vending;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import dbUtils.*;

public class DbMods {
    /*
     * Returns a "StringData" object that is full of field level validation
     * error messages (or "" for any field that passes validation).
     */
    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

        /*
         * Useful to copy field names from StringData as a reference
         * public String ID = ""; // auto-increment primary key
         * public String ticketDate = ""; //DATE, NN
         * public String image =""; //varChar
         * public String latitude = ""; // DECIMAL(9,7), NN
         * public String longitude = ""; // DECIMAL(10,7), NN
         * public String description = ""; // varChar
         * public String acceptsBillsAndCoins = ""; //tinyInt
         * public String acceptsEPayments = ""; //tinyInt
         * public String review = ""; // double
         * public String webUserID = ""; //int
         * public String vendingTypeDesc = ""; //varchar
         * public String userEmail = ""; //varchar
         * 
         * }
         */
        // Validation
        // errorMsgs.userEmail = Validate.stringMsg(inputData.userEmail, 45, true);
        // errorMsgs.userPassword = Validate.stringMsg(inputData.userPassword, 45,
        // true);

        // if (inputData.userPassword.compareTo(inputData.userPassword2) != 0) { // case
        // sensative comparison
        // errorMsgs.userPassword2 = "Both passwords must match";
        // }
        errorMsgs.ticketDate = Validate.dateMsg(inputData.ticketDate, true);
        errorMsgs.image = Validate.stringMsg(inputData.image, 300, false);
        errorMsgs.latitude = Validate.latitudeMsg(inputData.latitude, true);
        errorMsgs.longitude = Validate.longitudeMsg(inputData.longitude, true);
        errorMsgs.description = Validate.stringMsg(inputData.description, 300, false);
        errorMsgs.acceptsBillsAndCoins = Validate.booleanMsg(inputData.acceptsBillsAndCoins, false);
        errorMsgs.acceptsEPayments = Validate.booleanMsg(inputData.acceptsEPayments, false);
        errorMsgs.review = Validate.integerMsg(inputData.review, false);
        errorMsgs.webUserId = Validate.integerMsg(inputData.webUserId, true);
        errorMsgs.vendingTypeId = Validate.integerMsg(inputData.vendingTypeId, true);
        // errorMsgs.vendingTypeDesc = Validate.stringMsg(inputData.vendingTypeDesc, 45,
        // false);
        return errorMsgs;
    } // validate

    public static StringData insert(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.characterCount() > 0) { // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
             * String sql =
             * "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
             * "web_user.user_role_id, user_role_type "+
             * "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id "
             * +
             * "ORDER BY web_user_id ";
             */
            // Start preparing SQL statement
            String sql = "INSERT INTO tblVendingMachine (ticketDate, image, latitude, longitude, description, acceptsBillsAndCoins, acceptsEPayments, review, web_user_id, vending_type_id)"
                    + "VALUES (?,?,?,?,?,?,?,?,?,?)";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setDate(1, Validate.convertDate(inputData.ticketDate));
            pStatement.setString(2, inputData.image);
            pStatement.setBigDecimal(3, Validate.convertDecimal(inputData.latitude));
            pStatement.setBigDecimal(4, Validate.convertDecimal(inputData.longitude));
            pStatement.setString(5, inputData.description);
            pStatement.setBoolean(6, Validate.convertBoolean(inputData.acceptsBillsAndCoins));
            pStatement.setBoolean(7, Validate.convertBoolean(inputData.acceptsEPayments));
            pStatement.setInt(8, Validate.convertInteger(inputData.review));
            pStatement.setInt(9, Validate.convertInteger(inputData.webUserId));
            pStatement.setInt(10, Validate.convertInteger(inputData.vendingTypeId));
            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to
                                             // the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk
                    // sql update.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Foreign Key Id - " + errorMsgs.errorMsg;
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "There exists an entry there " + errorMsgs.errorMsg;
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // insert

    public static StringData getById(DbConn dbc, String id) {
        StringData sd = new StringData();
        // This case already tested in the controller, but ("belt and suspenders")
        // we are double checking here as well.
        if (id == null) {
            sd.errorMsg = "Cannot getById (user): id is null";
            return sd;
        }

        sd.errorMsg = dbc.getErr();
        if (sd.errorMsg.length() > 0) { // cant proceed, database error
            return sd;
        }

        Integer intId;
        try {
            intId = Integer.valueOf(id);
        } catch (Exception e) {
            sd.errorMsg = "Cannot getById (user): URL parameter 'id' can't be converted to an Integer.";
            return sd;
        }
        try {
            String sql = "SELECT ID,  ticketDate, image, latitude, longitude, description, acceptsBillsAndCoins, acceptsEPayments, review, tblVendingMachine.web_user_id, tblVendingMachine.vending_type_id, vending_type_desc, user_email   "
                    + "FROM tblVendingMachine, web_user, vending_type where tblVendingMachine.web_user_id = web_user.web_user_id AND tblVendingMachine.vending_type_id = vending_type.vending_type_id "
                    + " AND ID = ?";
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the
            // the first (and only) ?
            stmt.setInt(1, intId);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set

                // plainInteger returns integer converted to string with no commas.
                sd.ID = Format.fmtInteger(results.getObject("ID"));
                sd.ticketDate = Format.fmtDate(results.getObject("ticketDate"));
                sd.image = Format.fmtString(results.getObject("image"));
                sd.latitude = Format.fmtDecimal(results.getObject("latitude"));
                sd.longitude = Format.fmtDecimal(results.getObject("longitude"));
                sd.description = Format.fmtString(results.getObject("description"));
                sd.acceptsBillsAndCoins = Format.fmtBoolean(results.getObject("acceptsBillsAndCoins"));
                sd.acceptsEPayments = Format.fmtBoolean(results.getObject("acceptsEPayments"));
                sd.review = Format.fmtDecimal(results.getObject("review"));
                sd.webUserId = Format.fmtInteger(results.getObject("web_user_id"));
                sd.vendingTypeId = Format.fmtInteger(results.getObject("vending_type_id"));
                // sd.vendingTypeDesc =
                // Format.fmtString(results.getObject("vending_type_desc"));

            } else {
                sd.errorMsg = "ID Not Found.";
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in model.vending.DbMods.getById(): " + e.getMessage();
        }
        return sd;
    } // getById

    public static StringData update(StringData updateData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(updateData);

        // For update, we also need to check that ID has been supplied by the user...
        errorMsgs.ID = Validate.integerMsg(updateData.ID, true);

        if (errorMsgs.characterCount() > 0) { // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
             * Useful to know the exact field names in the database...
             * String sql =
             * "SELECT web_user_id, user_email, user_password, user_image, membership_fee, "
             * "birthday, web_user.user_role_id, user_role_type "+
             * "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id "
             * "ORDER BY web_user_id ";
             */

            String sql = "UPDATE tblVendingMachine SET ticketDate=?, image=?, latitude=?, longitude=?, description=?, acceptsBillsAndCoins=?, acceptsEPayments=?, review=?, web_user_id=?, vending_type_id=? "
                    + "WHERE ID=?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setDate(1, Validate.convertDate(updateData.ticketDate));
            pStatement.setString(2, updateData.image);
            pStatement.setBigDecimal(3, Validate.convertDecimal(updateData.latitude));
            pStatement.setBigDecimal(4, Validate.convertDecimal(updateData.longitude));
            pStatement.setString(5, updateData.description);
            pStatement.setBoolean(6, Validate.convertBoolean(updateData.acceptsBillsAndCoins));
            pStatement.setBoolean(7, Validate.convertBoolean(updateData.acceptsEPayments));
            pStatement.setInt(8, Validate.convertInteger(updateData.review));
            pStatement.setInt(9, Validate.convertInteger(updateData.webUserId));
            pStatement.setInt(10, Validate.convertInteger(updateData.vendingTypeId));
            pStatement.setInt(11, Validate.convertInteger(updateData.ID));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to
                                             // the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk
                    // sql update OR the web User id (supplied by the client side) does not exist.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Web User Id - " + errorMsgs.errorMsg;
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That coordinate was already taken, please change longitude and latitude "
                        + errorMsgs.errorMsg;
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // update
}
