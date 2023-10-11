package com.eap_web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import model.vending.*;

import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@RestController
public class TblVendingMachineControllerSimple {

    @RequestMapping("/tblVendingMachine/getAllSimple")
    public String dbController() {
        StringDataList strDataList = new StringDataList();
        StringData sd = new StringData();
        String msg = "";
        try {
            String DRIVER = "com.mysql.cj.jdbc.Driver";
            Class.forName(DRIVER);
            Connection conn = null;
            try {
                String dbAndPass = "fa23_3308_tuk31354?user=tuk31354&password=yei3ohXa";
                String url = "jdbc:mysql://localhost:3307/" + dbAndPass; // Assumes running from home
                conn = DriverManager.getConnection(url);
                String sql = "SELECT ID, ticketID, ticketDate, image, latitude, longitude, description, acceptsBillsAndCoins, acceptsEPayments, review, web_user_id, vending_type_id "
                    + "FROM tblVendingMachine "
                    + "ORDER BY ID";
                try {
                    PreparedStatement stmt = conn.prepareStatement(sql);
                    ResultSet results = stmt.executeQuery();
                    while (results.next()) {
                        sd = new StringData();
                        try {
                            sd.ID = String.valueOf(results.getInt("web_user_id")); // convert to string
                            sd.ticketID = results.getString("ticketID");
                            sd.ticketDate = results.getString("ticketDate");
                            sd.image = results.getString("image");
                            sd.latitude = String.valueOf(results.getDouble("latitude")); // convert to string
                            sd.longitude = String.valueOf(results.getDouble("longitude")); // convert to string
                            sd.description = results.getString("description");
                            sd.acceptsBillsAndCoins = String.valueOf(results.getBoolean("acceptsBillsAndCoins")); // convert to string
                            sd.acceptsEPayments = String.valueOf(results.getBoolean("acceptsEPayments")); // convert to string
                            sd.review = String.valueOf(results.getDouble("review")); // convert to string
                            sd.webUserID = String.valueOf(results.getInt("web_user_id")); // convert to string
                           
                        } catch (Exception e) {
                            msg = "Exception thrown while extracting data from result set. Error is: "
                                    + e.getMessage();
                            sd.errorMsg = msg;
                            System.out.println(msg);
                        }
                        strDataList.add(sd);
                    } // while there's more data in result set
                    results.close();
                    stmt.close();
                } catch (Exception e) {
                    msg = "Exception thrown compiling this SQL (" + sql + "). Error is: " + e.getMessage();
                    strDataList.add(sd);
                    System.out.println(msg);
                } finally {
                    conn.close(); // every code path that opens a db connection must also close it
                    // or else there will be a DB Connection leak (which brings down servers).
                }
            } catch (Exception e) {
                msg = "Exception thrown trying to connect. Error is: " + e.getMessage();
                strDataList.add(sd);
                System.out.println(msg);
            }
        } catch (Exception e) {
            msg = "Exception thrown trying to find MySQL Drivers. Error is: " + e.getMessage();
            strDataList.add(sd);
            System.out.println(msg);
        }
        return dbUtils.Json.toJson(strDataList);
    }
}