package com.javafest.dotEdu.Controller;

import com.javafest.dotEdu.Model.Contribution;
import com.javafest.dotEdu.Model.History;
import com.javafest.dotEdu.Service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class HistoryController {
    @Autowired
    public HistoryService historyService;

    @PostMapping("/history/add")
    public String add(@RequestBody History history){
        historyService.saveHistory(history);
        return "Sucessfully Saved!!";
    }

    @GetMapping("/history/{email}") //get unReviewed contribution
    public List<History> findUnreviewed(@PathVariable String email){
        return historyService.findUserHistory(email);
    }
}
