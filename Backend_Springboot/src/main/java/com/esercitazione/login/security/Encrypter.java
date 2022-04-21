package com.esercitazione.login.security;
import java.math.BigInteger;
import java.security.MessageDigest;


//FUNZIONE DA CORRREGGERE
public class Encrypter {
    public static String encrypt(String message) {
        try{
            MessageDigest m = MessageDigest.getInstance("SHA-256");
            m.update(message.getBytes());
            return String.format("%032x",new BigInteger(1,m.digest()));
        }
        catch(Exception e){
            return null;
        }
    }


}
