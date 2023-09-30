package com.javafest.dotEdu.Service;

import com.javafest.dotEdu.Model.Contribution;
import com.javafest.dotEdu.Repository.ContributorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContributorService {

    @Autowired
    public ContributorRepository contributorRepository;

    //Save provided question and answer
    public Contribution saveContribution(Contribution contribution){
        return contributorRepository.save(contribution);
    }

    public List<Contribution> finUnreviewedContribution(String email){
        return contributorRepository.findUnreviewedContributions(email);
    }
}
