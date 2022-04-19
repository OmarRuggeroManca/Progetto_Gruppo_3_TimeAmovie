package com.esercitazione.login.repository;

import com.esercitazione.login.model.User;
import org.springframework.stereotype.Repository;

import java.util.*;


public class InMemoryDatabase {
    static Map<Integer, User> users = new HashMap<>();
    static int lastIndex = 0;

    public static int adduser(User user){//metodo per aggiungere e registrare nuovo utente
        user.setId(++lastIndex);
        users.put(user.getId(),user);
        return 1;
    }

    public static User getUserById(int id){ //metodo per ricerca tramite id
        return getUserById(id);
    }
/*
    public static List<User> allUser(){
        Collection<User> usersValues = users.values();
        return new ArrayList<>(usersValues);
    }*/

    public static List<User> allUser(){
        List<User> listaUtenti = new ArrayList<>();
        listaUtenti.addAll(users.values());
        return listaUtenti;
    }


    public static int updateUser(int id, User user) {
        user.setId(id);
        users.put(id, user);
        return 1;
    }

    public static int deleteUser(int id) {
        users.remove(id);
        return 1;
    }



    }




