package com.shlomi.analytics.analytics_sdk_backend.repository;

import com.shlomi.analytics.analytics_sdk_backend.model.UserEvent;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface UserEventRepository extends MongoRepository<UserEvent, String> {
    
    List<UserEvent> findByEventTimestampBetween(Instant start, Instant end);
    
    List<UserEvent> findByEventType(String eventType);
    
    List<UserEvent> findByUserId(String userId);
    
    List<UserEvent> findByEventTypeAndEventTimestampBetween(String eventType, Instant start, Instant end);
    
    @Query("{ 'eventTimestamp' : { $gte: ?0, $lte: ?1 }, 'eventType': ?2, 'userId': ?3 }")
    List<UserEvent> findByDateRangeAndEventTypeAndUserId(Instant start, Instant end, String eventType, String userId);
    
    @Query("{ 'userId': { $exists: true } }")
    List<String> findDistinctUserIds();
}