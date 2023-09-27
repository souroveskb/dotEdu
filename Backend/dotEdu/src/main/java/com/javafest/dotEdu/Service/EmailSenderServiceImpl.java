package com.javafest.dotEdu.Service;

import com.javafest.dotEdu.Model.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderServiceImpl implements EmailSenderService{
    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public String sendSimpleMail(Email email) {
        try{
            SimpleMailMessage mailMessage = new SimpleMailMessage();

            mailMessage.setFrom("adibskitto@gmail.com");
            mailMessage.setTo(email.getReceiver());
            mailMessage.setSubject(email.getSubject());
            mailMessage.setText(email.getMsgBody());

            javaMailSender.send(mailMessage);
            return "Mail sent successfully !!";
        }
        catch (Exception e){
            return "Error while sending mail";
        }
    }
}
