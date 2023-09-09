package com.javafest.dotEdu.Controller;

import com.javafest.dotEdu.Model.Email;
import com.javafest.dotEdu.Service.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailSenderController {
    @Autowired
    private EmailSenderService emailService;
    @PostMapping("/api/auth/sendmail")
    public String sendMail(@RequestBody Email emailDetails){
        return emailService.sendSimpleMail(emailDetails);
    }
}
