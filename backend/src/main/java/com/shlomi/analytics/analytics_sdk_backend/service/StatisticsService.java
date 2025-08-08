package com.shlomi.analytics.analytics_sdk_backend.service;

import com.shlomi.analytics.analytics_sdk_backend.model.UserEvent;
import com.shlomi.analytics.analytics_sdk_backend.repository.UserEventRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.LinkedHashMap;

@Service
public class StatisticsService {

    private final UserEventRepository repository;

    public StatisticsService(UserEventRepository repository) {
        this.repository = repository;
    }

    public long getTotalEventsCountFiltered(Instant start, Instant end, String eventType) {
        List<UserEvent> events = repository.findAll();
        List<UserEvent> filteredEvents = filterEvents(events,start, end, eventType);
        return filteredEvents.size();
    }

    private List<UserEvent> filterEvents(List<UserEvent> events, Instant start, Instant end, String eventType) {
        return events.stream()
                .filter(event -> {
                    Instant ts = event.getEventTimestamp();
                    boolean inRange = !ts.isBefore(start) && !ts.isAfter(end);
                    boolean typeMatches = (eventType == null || event.getEventType().equals(eventType));
                    return inRange && typeMatches;
                })
                .collect(Collectors.toList());
    }

    public Map<String, Long> getEventsCountByMonthLastYear() {
        List<UserEvent> events = repository.findAll();
        Instant oneYearAgo = Instant.now().minusSeconds(365 * 24 * 3600);
        List<UserEvent> filteredEvents = filterEvents(events, oneYearAgo, Instant.now(), null);

        Map<YearMonth, Long> countsByMonth = filteredEvents.stream()
                .collect(Collectors.groupingBy(event -> {
                    LocalDate date = LocalDate.ofInstant(event.getEventTimestamp(), ZoneId.systemDefault());
                    return YearMonth.from(date);
                }, Collectors.counting()));

        return countsByMonth.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .collect(Collectors.toMap(
                        e -> e.getKey().toString(),
                        Map.Entry::getValue,
                        (e1, e2) -> e1,
                        java.util.LinkedHashMap::new
                ));
    }


    public double getAverageEventsPerUser() {
        List<UserEvent> events = repository.findAll();

        if (events.isEmpty()) return 0;

        Map<String, Long> countsByUser = events.stream()
                .collect(Collectors.groupingBy(UserEvent::getUserId, Collectors.counting()));

        return (double) events.size() / countsByUser.size();
    }

    public Map<String, Map<LocalDate, Long>> getDailyEventsPerUser() {
        List<UserEvent> events = repository.findAll();

        return events.stream()
                .collect(Collectors.groupingBy(UserEvent::getUserId,
                        Collectors.groupingBy(event -> LocalDate.ofInstant(event.getEventTimestamp(), ZoneId.systemDefault()),
                                Collectors.counting())));
    }

    public long getTotalUsersCount() {
        List<UserEvent> events = repository.findAll();
        return events.stream()
                .map(UserEvent::getUserId)
                .distinct()
                .count();
    }


    public Map<String, Long> getEventsPerUserDistribution() {
        List<UserEvent> events = repository.findAll();

        Map<String, Long> countsByUser = events.stream()
                .collect(Collectors.groupingBy(UserEvent::getUserId, Collectors.counting()));

        Map<String, Long> distribution = countsByUser.values().stream()
                .collect(Collectors.groupingBy(count -> {
                    if (count <= 10) return "0-10";
                    else if (count <= 50) return "11-50";
                    else return "51+";
                }, Collectors.counting()));

        return distribution;
    }

    public Map<String, Long> getTopUsersByEvents(int topN) {
        List<UserEvent> events = repository.findAll();

        Map<String, Long> countsByUser = events.stream()
                .collect(Collectors.groupingBy(UserEvent::getUserId, Collectors.counting()));

        return countsByUser.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(topN)
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (e1, e2) -> e1,
                        LinkedHashMap::new
                ));
    }

    public Map<String, Long> getEventsCountByType() {
        List<UserEvent> events = repository.findAll();
        return events.stream()
                .collect(Collectors.groupingBy(UserEvent::getEventType, Collectors.counting()));
    }


    public Map<String, Double> getUserRetentionRates() {
        List<UserEvent> events = repository.findAll();

        Map<String, List<Instant>> userEvents = events.stream()
                .collect(Collectors.groupingBy(
                        UserEvent::getUserId,
                        Collectors.mapping(UserEvent::getEventTimestamp, Collectors.toList())
                ));

        int totalUsers = userEvents.size();
        int day1Count = 0, day7Count = 0, day30Count = 0;

        for (List<Instant> timestamps : userEvents.values()) {
            timestamps.sort(Instant::compareTo);
            Instant first = timestamps.get(0);

            boolean d1 = timestamps.stream().anyMatch(ts -> ts.isAfter(first.plusSeconds(24 * 3600)));
            boolean d7 = timestamps.stream().anyMatch(ts -> ts.isAfter(first.plusSeconds(7 * 24 * 3600)));
            boolean d30 = timestamps.stream().anyMatch(ts -> ts.isAfter(first.plusSeconds(30 * 24 * 3600)));

            if (d1) day1Count++;
            if (d7) day7Count++;
            if (d30) day30Count++;
        }

        Map<String, Double> retentionRates = new LinkedHashMap<>();
        retentionRates.put("Day 1", (day1Count * 100.0) / totalUsers);
        retentionRates.put("Day 7", (day7Count * 100.0) / totalUsers);
        retentionRates.put("Day 30", (day30Count * 100.0) / totalUsers);

        return retentionRates;
    }


}