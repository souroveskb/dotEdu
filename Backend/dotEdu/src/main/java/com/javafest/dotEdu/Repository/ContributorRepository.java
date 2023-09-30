package com.javafest.dotEdu.Repository;

import com.javafest.dotEdu.Model.Contribution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface ContributorRepository extends JpaRepository<Contribution,Integer> {

    // This query is to fetch unReviewed Question by a particular user
    @Query("SELECT c "
            + "FROM Contribution c LEFT JOIN Review r ON c.id = r.contribution_id and r.reviewer = :email "
            + "where r.reviewer is null and c.contributor != :email")
    List<Contribution> findUnreviewedContributions(@Param("email") String email);
}
