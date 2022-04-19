package com.esercitazione.login.service;

import com.esercitazione.login.DAO.UserRepositoryDAO;
import com.esercitazione.login.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
   UserRepositoryDAO userDAO;

   @Autowired
   PasswordEncoder passwordEncoder;


    @Autowired
    public UserService(UserRepositoryDAO userDAO){
        this.userDAO = userDAO;
    }

    /*
        Metodo che permette l'aggiunta di un utente inserendo un username e una password da parte dell'admin. In pa
        particolare la password viene criptata e salvata nel DB per questioni di security
     */
    public String addUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setEnabled((byte) 1);
        user.setAuthorities("ROLE_USER");
        User result = userDAO.save(user);
        if (result != null) {
            return "Utente salvato correttamente";
        } else {
            return "Errore nel salvataggio";
        }
    }

    /*
    Metodo che permette di cercare un user tramite il suo username
     */
    public User getUserByUsername(String username) {
        User result = userDAO.findByUsername(username);
        return result;
    }


    /*
    Medoto di login che permette di effettuare l'accesso solamente quando sia username che password non sono NULL
    e essi coincidono con i dati creati con l'addUser. Se il login andrà a buon fine, l'utente potrà vedere sia username
    che password, in particolare quest'ultima sarà criptata per questioni di security.
     */
    public User userLogin(User login) {
        if (login.getPassword() != null && login.getUsername() != null) {
            User credenziali = userDAO.findByUsername(login.getUsername());
            if (passwordEncoder.matches(login.getPassword(), credenziali.getPassword())) {
                return credenziali;
            }
        } else {
            return null;
        }

        return  null;
    }

    /*
    Metodo che restituisce un user faceno la ricerca tramite il suo ID
     */
    public User getUserById(int id) {
        Optional result = userDAO.findById(id); //Optional serve a incapsulare un risultato e dire se esiste o no
        return (User) result.get();
    }

    public Iterable<User> allUsers() {
        return userDAO.findAll();
    }

}
