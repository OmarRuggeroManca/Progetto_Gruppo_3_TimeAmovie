package com.esercitazione.login.controller;


import com.esercitazione.login.model.User;
import com.esercitazione.login.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Entity;

@RestController
@RequestMapping("/login")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService= userService;
    }

    //CRUD

    @PostMapping("/adduser")
    public String addUser(@RequestBody User user){
        return userService.addUser(user);
    }

    @PostMapping("/access/")
    public User userLogin(@RequestBody User login) {
            return userService.userLogin(login);


    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") int id){
        return userService.getUserById(id);
    }

    @GetMapping("/")
    public Iterable<User> allUsers(){
        return userService.allUsers();
    }



}
