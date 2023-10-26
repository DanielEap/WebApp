package model.vending;

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
        // errorMsgs.userPassword = Validate.stringMsg(inputData.userPassword, 45, true);

        // if (inputData.userPassword.compareTo(inputData.userPassword2) != 0) { // case sensative comparison
        //     errorMsgs.userPassword2 = "Both passwords must match";
        // }
        errorMsgs.ticketDate = Validate.dateMsg(inputData.ticketDate, false);
        errorMsgs.image = Validate.stringMsg(inputData.image, 300, false);
        errorMsgs.latitude = Validate.latitudeMsg(inputData.latitude, true);
        errorMsgs.longitude = Validate.longitudeMsg(inputData.longitude, true);
        errorMsgs.description = Validate.stringMsg(inputData.description, 300, false);
        errorMsgs.acceptsBillsAndCoins = Validate.booleanMsg(inputData.acceptsBillsAndCoins, false);
        errorMsgs.acceptsEPayments = Validate.booleanMsg(inputData.acceptsEPayments, false);
        errorMsgs.review = Validate.integerMsg(inputData.review, false);
        errorMsgs.webUserId = Validate.integerMsg(inputData.webUserId, true);
        errorMsgs.vendingTypeId = Validate.integerMsg(inputData.vendingTypeId, true);
        // errorMsgs.vendingTypeDesc = Validate.stringMsg(inputData.vendingTypeDesc, 45, false);
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

}
