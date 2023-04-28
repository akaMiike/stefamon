package com.stefanini.utils;

import java.util.Base64;

public abstract class PasswordUtils {
    public static String decodeBase64(String encodedPassword){
        return new String(Base64.getDecoder().decode(encodedPassword));
    }

    public static String encodeBase64(String password){
        return Base64.getEncoder().encodeToString(password.getBytes());
    }

    public static boolean passwordMatches(String encodedPassword, String password){
        return encodeBase64(password).equals(encodedPassword);
    }
}
