package com.javafest.dotEdu.Repository;

import com.javafest.dotEdu.Model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
}
