package com.javafest.dotEdu.Service;

import com.javafest.dotEdu.Model.Review;
import com.javafest.dotEdu.Repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {
    @Autowired
    public ReviewRepository reviewRepository;

    //Save Review of provided questions and answers
    public Review saveReview(Review review){
        return reviewRepository.save(review);
    }
}
