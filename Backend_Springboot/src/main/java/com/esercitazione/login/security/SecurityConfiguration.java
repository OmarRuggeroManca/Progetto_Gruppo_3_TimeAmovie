package com.esercitazione.login.security;

import org.apache.catalina.filters.CorsFilter;
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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.sql.DataSource;
import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    DataSource Datasource;





    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication()
                .dataSource(Datasource)
                .usersByUsernameQuery("select username,password,enabled "   //Prende gli utenti tramite query con le password criptate
                        + "from users "
                        + "where username = ?");
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

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setAllowedOrigins(Arrays.asList("https://hoppscotch.io/it/"));
        corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
                "Accept", "Authorization", "Origin, Accept", "X-Requested-With",
                "Access-Control-Request-Method", "Access-Control-Request-Headers"));
        corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization",
                "Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        return new CorsFilter();
    }



}
