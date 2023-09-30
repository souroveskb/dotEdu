package com.javafest.dotEdu.Service;

import com.javafest.dotEdu.Model.History;
import com.javafest.dotEdu.Repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoryService {
    @Autowired
    public HistoryRepository historyRepository;

    //save a history item
    public History saveHistory(History history){
        return historyRepository.save(history);
    }

    public List<History> findUserHistory(String email){
        return historyRepository.findUserHistory(email);
    }
}
