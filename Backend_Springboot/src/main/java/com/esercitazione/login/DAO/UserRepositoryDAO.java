package com.esercitazione.login.DAO;

import com.esercitazione.login.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;


@Repository
@CrossOrigin(origins = "http://localhost:4200")
public interface UserRepositoryDAO extends CrudRepository<User, Integer> {


    User findByUsername(String username);

}
