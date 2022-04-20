package com.esercitazione.login.DAO;

import com.esercitazione.login.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepositoryDAO extends CrudRepository<User, Integer> {


    User findByUsername(String username);

}
