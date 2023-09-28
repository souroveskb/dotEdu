package com.javafest.dotEdu.Controller;

import com.javafest.dotEdu.Auth.AuthenticationRequest;
import com.javafest.dotEdu.Auth.AuthenticationResponse;
import com.javafest.dotEdu.Auth.RegisterRequest;
import com.javafest.dotEdu.Model.User;
import com.javafest.dotEdu.Service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {
    private final AuthenticationService service;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse>register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse>register(@RequestBody AuthenticationRequest request){

        return ResponseEntity.ok(service.authenticate(request));
    }

    //find user details using email
    @GetMapping("/getUser/{email}")
    public User getUser(@PathVariable String email){
        return service.findByEmail(email);
    }

    //update verification status of verified user
    @PutMapping("/verify/update/{id}")
    public User updateFood(@PathVariable int id, @RequestBody User user){
        user.setId(id);
        return service.updateVerificationStatus(user);
    }
    //demo controller
    @GetMapping("/demo")
    public ResponseEntity<String> sayHello(){
        return ResponseEntity.ok("Hello from demo");
    }


}
