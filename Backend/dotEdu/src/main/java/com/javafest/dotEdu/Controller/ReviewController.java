package com.javafest.dotEdu.Controller;

import com.javafest.dotEdu.Model.Review;
import com.javafest.dotEdu.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class ReviewController {

    @Autowired
    public ReviewService reviewService;

    @PostMapping("/review/add") //save a review
    public String add(@RequestBody Review review){
        reviewService.saveReview(review);
        return "Sucessfully Saved!!";
    }
}
