package com.shlomi.analytics.analytics_sdk_backend.controller;

import com.shlomi.analytics.analytics_sdk_backend.service.StatisticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/statistics")
public class StatisticsController {

    private final StatisticsService statisticsService;

    public StatisticsController(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }


    // Retrieves the total number of events, optionally filtered by start date, end date, and event type.
    @GetMapping("/total-events")
    public ResponseEntity<Map<String, Object>> getTotalEvents(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) String eventType) {

        Instant start = (startDate != null) ? Instant.parse(startDate) : Instant.EPOCH;
        Instant end = (endDate != null) ? Instant.parse(endDate) : Instant.now();

        long count = statisticsService.getTotalEventsCountFiltered(start, end, eventType);
        return ResponseEntity.ok(Map.of("count", count));
    }

    // Retrieves a count of events grouped by event type.
    @GetMapping("/events-by-type")
    public ResponseEntity<List<Map<String, Object>>> getEventsByType() {
        Map<String, Long> data = statisticsService.getEventsCountByType();
        List<Map<String, Object>> result = data.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> map = new java.util.HashMap<>();
                    map.put("eventType", entry.getKey());
                    map.put("count", entry.getValue());
                    return map;
                })
                .collect(java.util.stream.Collectors.toList());
        return ResponseEntity.ok(result);
    }

    // Retrieves a monthly breakdown of event counts for the past year.
    @GetMapping("/events-by-month")
    public ResponseEntity<List<Map<String, Object>>> getEventsByMonth() {
        Map<String, Long> data = statisticsService.getEventsCountByMonthLastYear();
        List<Map<String, Object>> result = data.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> map = new java.util.HashMap<>();
                    map.put("month", entry.getKey());
                    map.put("count", entry.getValue());
                    return map;
                })
                .collect(java.util.stream.Collectors.toList());
        return ResponseEntity.ok(result);
    }

    // Calculates the average number of events per user.
    @GetMapping("/average-events-per-user")
    public ResponseEntity<Map<String, Object>> getAverageEventsPerUser() {
        double average = statisticsService.getAverageEventsPerUser();
        return ResponseEntity.ok(Map.of("average", average));
    }

    //  Retrieves a map of user IDs to their daily event counts.
    @GetMapping("/daily-events-per-user")
    public ResponseEntity<Map<String, Map<LocalDate, Long>>> getDailyEventsPerUser() {
        return ResponseEntity.ok(statisticsService.getDailyEventsPerUser());
    }

    // Retrieves the total number of unique users.
    @GetMapping("/total-users")
    public ResponseEntity<Map<String, Object>> getTotalUsers() {
        long count = statisticsService.getTotalUsersCount();
        return ResponseEntity.ok(Map.of("count", count));
    }

    // Returns a distribution of users based on their total number of events.
    @GetMapping("/events-per-user-distribution")
    public ResponseEntity<Map<String, Long>> getEventsPerUserDistribution() {
        return ResponseEntity.ok(statisticsService.getEventsPerUserDistribution());
    }

    // Retrieves the top 10 users based on the number of events they triggered.
    @GetMapping("/top-users")
    public ResponseEntity<List<Map<String, Object>>> getTopUsersByEvents() {
        Map<String, Long> data = statisticsService.getTopUsersByEvents(10);
        List<Map<String, Object>> result = data.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> map = new java.util.HashMap<>();
                    map.put("userId", entry.getKey());
                    map.put("eventCount", entry.getValue());
                    return map;
                })
                .collect(java.util.stream.Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/user-retention")
    public ResponseEntity<List<Map<String, Object>>> getUserRetentionRates() {
        Map<String, Double> data = statisticsService.getUserRetentionRates();
        List<Map<String, Object>> result = data.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> map = new java.util.HashMap<>();
                    map.put("period", entry.getKey());
                    map.put("retentionRate", entry.getValue());
                    return map;
                })
                .collect(java.util.stream.Collectors.toList());
        return ResponseEntity.ok(result);
    }

    // Add the endpoint that frontend expects
    @GetMapping("/user-retention-rate")
    public ResponseEntity<Map<String, Object>> getUserRetentionRate() {
        Map<String, Double> rates = statisticsService.getUserRetentionRates();
        // Return the overall retention rate (average of all periods)
        double averageRate = rates.values().stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
        return ResponseEntity.ok(Map.of("rate", averageRate));
    }


}
