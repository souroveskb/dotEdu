package com.javafest.dotEdu.Service;

import com.javafest.dotEdu.Auth.AuthenticationRequest;
import com.javafest.dotEdu.Auth.AuthenticationResponse;
import com.javafest.dotEdu.Auth.RegisterRequest;
import com.javafest.dotEdu.Model.Role;
import com.javafest.dotEdu.Model.User;
import com.javafest.dotEdu.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    //generate token when login
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
        ));

        //get user details using user mail
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();

        //generate token using the details
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }


    //generate token when register
    public AuthenticationResponse register(RegisterRequest request) {

        //make an user with necessary details
        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .token(request.getToken())
                .verified(request.isVerified())
                .role(Role.USER)
                .build();

        //if user email is not taken by anyone then generate token
        if(!repository.existsByEmail(request.getEmail())){
            repository.save(user);
            var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        }
        //user email already exits
        else{
            return AuthenticationResponse.builder()
                    .Error("User already exits")
                    .build();
        }

    }

    //find user details using mail
    public User findByEmail(String email) {
        Optional<User> user = repository.findByEmail(email);
        if(user.isPresent()){
            return user.get();
        }
        throw new RuntimeException("User not found in " + email);
    }

    //update users verification status
    public User updateVerificationStatus(User user){
        return repository.save(user);
    }
}
