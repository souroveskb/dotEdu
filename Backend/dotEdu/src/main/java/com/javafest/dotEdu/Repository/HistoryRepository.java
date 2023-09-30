package com.javafest.dotEdu.Repository;

import com.javafest.dotEdu.Model.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HistoryRepository extends JpaRepository<History,Integer> {
    //finding history of specific user
    @Query("SELECT h FROM History h WHERE h.user = :email ORDER BY h.id DESC")
    List<History> findUserHistory(@Param("email") String email);
}
