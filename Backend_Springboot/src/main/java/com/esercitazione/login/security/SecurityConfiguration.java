package com.esercitazione.login.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    DataSource Datasource;


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
       auth.inMemoryAuthentication()
               .withUser("davide")
               .password(passwordEncoder.encode("pizza"))
               .roles("USER");
 /*   @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication()
                .dataSource(this.Datasource)
                 .usersByUsernameQuery("select username,password,enabled "
                + "from user "
                + "where username = ?")
                .authoritiesByUsernameQuery("select username,authorities "
                        + "from role "
                        + "where username = ?");




                .withUser("davide")
                .password(passwordEncoder.encode("pizza"))
                .roles("USER");*/

    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
       http.csrf().disable()
               .authorizeRequests()
               .antMatchers("/login/adduser/")
               .permitAll()
               .antMatchers(HttpMethod.GET, "/login/*")
               .hasAnyRole("USER")
               .antMatchers(HttpMethod.POST, "/login/access/")
               .hasAnyRole("USER")
               .antMatchers(HttpMethod.PUT, "/login/access/")
               .hasAnyRole("USER")
               .antMatchers(HttpMethod.DELETE, "/login/*")
               .hasAnyRole("USER")
               .anyRequest().authenticated()
               .and()
               .httpBasic();

    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return passwordEncoder;
    }


}
