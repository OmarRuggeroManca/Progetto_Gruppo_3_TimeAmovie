package com.esercitazione.login.controller;


import com.esercitazione.login.model.User;
import com.esercitazione.login.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Entity;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/login")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService){  
        this.userService= userService;
    }

    //CRUD

    @CrossOrigin(origins = "*")
    @PostMapping("/adduser")
    public String addUser(@RequestBody User user){  //metodo che permette l'aggiunta di un User
        return userService.addUser(user);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/access/")
    public User userLogin(@RequestBody User login) {  //metodo che permette il login di un User e rende username e password (criptata)
            return userService.userLogin(login);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") int id){ //metodo che permette la ricerca di un user tramite il suo id
        return userService.getUserById(id);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/")
    public Iterable<User> allUsers(){   //metodo che permette di visualizzare tutta la lista degli utenti presenti nel DB
        return userService.allUsers();
    }



}
