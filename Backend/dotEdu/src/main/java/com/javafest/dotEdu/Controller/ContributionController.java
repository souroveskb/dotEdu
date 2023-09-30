package com.javafest.dotEdu.Controller;

import com.javafest.dotEdu.Model.Contribution;
import com.javafest.dotEdu.Service.ContributorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class ContributionController {
    @Autowired
    public ContributorService contributorService;

    @PostMapping("/contribution/add") //save a contribution
    public String add(@RequestBody Contribution contribution){
        contributorService.saveContribution(contribution);
        return "Sucessfully Saved!!";
    }
    @GetMapping("/contribution/unreview/{email}") //get unReviewed contribution
    public List<Contribution> findUnreviewed(@PathVariable String email){
        return contributorService.finUnreviewedContribution(email);
    }
}
