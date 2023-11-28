package com.eap_web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import model.vending.*;
import dbUtils.*;
import view.VendingView;

@RestController
public class TblVendingMachineController {
    @RequestMapping(value = "/tblVendingMachine/getAll", produces = "application/json")
    public String allUsers() {

        StringDataList list = new StringDataList(); // dbError empty, list empty
        DbConn dbc = new DbConn();
        list = VendingView.getAllUsers(dbc);

        dbc.close(); // EVERY code path that opens a db connection must close it
                     // (or else you have a database connection leak).

        return Json.toJson(list); // convert sdl obj to JSON Format and return that.
    }

    @RequestMapping(value = "/tblVendingMachine/insert", params = { "jsonData" }, produces = "application/json")
    public String insert(@RequestParam("jsonData") String jsonInsertData) {

        StringData errorMsgs = new StringData();

        if ((jsonInsertData == null) || jsonInsertData.length() == 0) {
            errorMsgs.errorMsg = "Cannot insert. No user data was provided in JSON format";
        } else {
            System.out.println("user data for insert (JSON): " + jsonInsertData);
            try {
                ObjectMapper mapper = new ObjectMapper();
                StringData insertData = mapper.readValue(jsonInsertData, StringData.class);
                System.out.println("user data for insert (java obj): " + insertData.toString());

                DbConn dbc = new DbConn();
                errorMsgs.errorMsg = dbc.getErr();
                if (errorMsgs.errorMsg.length() == 0) { // db connection OK
                    errorMsgs = DbMods.insert(insertData, dbc);
                }
                dbc.close();
            } catch (Exception e) {
                String msg = "Could not convert jsonData to model.tblVendingMachine.StringData obj: " +
                        jsonInsertData + " - or other error in controller for 'user/insert': " +
                        e.getMessage();
                System.out.println(msg);
                errorMsgs.errorMsg += ". " + msg;
            }
        }
        return Json.toJson(errorMsgs);
    }

    @RequestMapping(value = "/tblVendingMachine/getById", params = {
            "vendingId" }, produces = "application/json")
    public String getById(@RequestParam("vendingId") String vendingId) {
        StringData sd = new StringData();
        if (vendingId == null) {
            sd.errorMsg = "Error: URL must be tblVendingMachine/getById/xx " +
                    "where xx is the ID of the desired tblVendingMachine record.";
        } else {
            DbConn dbc = new DbConn();
            sd.errorMsg = dbc.getErr();
            if (sd.errorMsg.length() == 0) {
                System.out.println("*** Ready to call DbMods.getById");
                sd = DbMods.getById(dbc, vendingId);
            }
            dbc.close(); // EVERY code path that opens a db connection must close it
            // (or else you have a database connection leak).
        }
        return Json.toJson(sd);
    }

    @RequestMapping(value = "/tblVendingMachine/update", params = { "jsonData" }, produces = "application/json")
    public String update(@RequestParam("jsonData") String jsonUpdateData) {

        StringData errorData = new StringData();

        if ((jsonUpdateData == null) || jsonUpdateData.length() == 0) {
            errorData.errorMsg = "Cannot update. No user data was provided in JSON format";
        } else {
            System.out.println("user data for update (JSON): " + jsonUpdateData);
            try {
                ObjectMapper mapper = new ObjectMapper();
                StringData updateData = mapper.readValue(jsonUpdateData, StringData.class);
                System.out.println("user data for update (java obj): " + updateData.toString());

                // The next 3 statements handle their own exceptions (so should not throw any
                // exception).
                DbConn dbc = new DbConn();
              
                errorData.errorMsg = dbc.getErr();
                if(errorData.errorMsg.length() == 0) {
                    errorData = DbMods.update(updateData, dbc);
                }
                dbc.close();
            } catch (Exception e) {
                String msg = "Unexpected error in controller for 'tblVendingMachine/update'... " +
                        e.getMessage();
                System.out.println(msg);
                errorData.errorMsg += ". " + msg;
            }
        }
        return Json.toJson(errorData);
    }

}
