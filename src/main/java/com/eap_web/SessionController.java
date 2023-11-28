package com.eap_web;

import java.sql.ResultSet;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dbUtils.DbConn;
import dbUtils.Json;
import jakarta.servlet.http.*;
import model.webUser.StringData;

@RestController
public class SessionController {

    @RequestMapping(value = "/session/login", params = { "email", "pwd" }, produces = "application/json")
    public String setSessionController(HttpServletRequest request, @RequestParam("email") String userEmail,
            @RequestParam("pwd") String userPwd) {

        StringData sd = new StringData();

        if ((userEmail == null) || (userPwd == null)) {
            sd.errorMsg = "Cannot check log on. Need params 'email' and 'pwd'.";
            return Json.toJson(sd);
        }
        DbConn dbc = new DbConn();
        if (dbc.getErr().length() > 0) {
            dbc.close(); // probably dont need this if the connection never opened, but doesnt hurt
            sd.errorMsg = "Error connecting: " + dbc.getErr();
            return Json.toJson(sd); // would be a db connection error
        }
        HttpSession session = request.getSession();


        String logonMsg = "";
        String sql = "";
        ResultSet results;
        try {
            sql += "SELECT user_email, user_password, web_user_id, user_image, birthday, membership_fee, user_role_id FROM web_user "
                    +
                    "WHERE user_email = ? and user_password = ?";
            // logonMsg += "<h4>SQL: " + sql + "</h4>";
            java.sql.PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            stmt.setString(1, userEmail);
            stmt.setString(2, userPwd);
            results = stmt.executeQuery();
            if (results.next()) {
                // logonMsg += "<p>Hello, user " + results.getString("user_email") + ". "
                // + "I see your password is " + results.getString("user_password") + ". "
                // + "You are user number " + results.getString("web_user_id") + ".</p>";

                sd.userEmail = results.getString("user_email");
                sd.userPassword = results.getString("user_password");
                sd.webUserId = results.getString("web_user_id");
                sd.userImage = results.getString("user_image");
                sd.birthday = results.getString("birthday");
                sd.membershipFee = results.getString("membership_fee");
                sd.userRoleId = results.getString("user_role_id");
                // sd.userRoleType = results.getString("user_role_type");

                sd.errorMsg = "";

                session.setAttribute("user", sd);
            } else {
                logonMsg += "<p>Invalid logon.</p>";
                sd.errorMsg = "Invalid logon.";
                session.invalidate();
            }
        } catch (Exception e) {
            logonMsg += "<p>Problem creating statement &/or running query:" + e.getMessage() + "</p>";
        }

        // try {
        //     session.setAttribute("user", sd);
        // } catch (Exception e) {
        //     sd.errorMsg = "Error setting session attribute: " + e.getMessage();
        //     System.out.println("Error setting session attribute: " + e.getMessage());
        // }
        return Json.toJson(sd);
    }

    @RequestMapping(value = "/session/read", produces = "application/json")
    public String getSessionController(HttpServletRequest request) {
        HttpSession session = request.getSession();
        StringData sd = new StringData();
        try {
            sd = (StringData) session.getAttribute("user");
            if (sd != null) {
                sd.errorMsg = "";
            } else {
                sd = new StringData();
                sd.errorMsg = "No user logged in.";
            }

        } catch (Exception e) {
            sd.errorMsg = "Error getting session attribute: " + e.getMessage();
            System.out.println("Error getting session attribute: " + e.getMessage());
        }
        return Json.toJson(sd);
    }

    @RequestMapping(value = "/session/logout", produces = "application/json")
    public String logoutController(HttpServletRequest request) {
        HttpSession session = request.getSession();
        StringData sd = new StringData();
        if (session.getAttribute("user") == null) {
            sd.errorMsg = "No session to invalidate.";
            return Json.toJson(sd);
        }
        try {
            session.invalidate();
            sd.errorMsg = "";
        } catch (Exception e) {
            sd.errorMsg = "Error invalidating session attribute: " + e.getMessage();
            System.out.println("Error invalidating session attribute: " + e.getMessage());
        }
        return Json.toJson(sd);
    }
}