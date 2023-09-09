package com.javafest.dotEdu.Service;

import com.javafest.dotEdu.Model.Email;

public interface EmailSenderService {
    String sendSimpleMail(Email email);
}
