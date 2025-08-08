package com.shlomi.analytics.analytics_sdk_backend.service;

import com.shlomi.analytics.analytics_sdk_backend.model.UserEvent;
import com.shlomi.analytics.analytics_sdk_backend.repository.UserEventRepository;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@Service
public class UserEventService {

    private final UserEventRepository repository;
    private final ObjectMapper objectMapper;

    public UserEventService(UserEventRepository repository) {
        this.repository = repository;
        this.objectMapper = new ObjectMapper();
    }

    public UserEvent createEvent(UserEvent event) {
        return repository.save(event);
    }

    public List<UserEvent> getAllEvents() {
        return repository.findAll();
    }

    public Map<String, Object> getFilteredEvents(Instant startDate, Instant endDate, String eventType, String userId, String metadata, int page, int limit) {
        List<UserEvent> allEvents = repository.findAll();
        List<UserEvent> filteredEvents = allEvents.stream()
                .filter(event -> {
                    boolean matchesDateRange = true;
                    if (startDate != null && event.getEventTimestamp().isBefore(startDate)) {
                        matchesDateRange = false;
                    }
                    if (endDate != null && event.getEventTimestamp().isAfter(endDate)) {
                        matchesDateRange = false;
                    }
                    
                    boolean matchesEventType = (eventType == null || event.getEventType().equals(eventType));
                    boolean matchesUserId = (userId == null || event.getUserId().equals(userId));
                    boolean matchesMetadata = (metadata == null || (event.getMetadata() != null && event.getMetadata().contains(metadata)));
                    
                    return matchesDateRange && matchesEventType && matchesUserId && matchesMetadata;
                })
                .collect(Collectors.toList());
        
        int total = filteredEvents.size();
        int startIndex = (page - 1) * limit;
        int endIndex = Math.min(startIndex + limit, total);
        
        List<UserEvent> paginatedEvents = filteredEvents.subList(
            Math.min(startIndex, total), 
            Math.min(endIndex, total)
        );
        
        Map<String, Object> result = new HashMap<>();
        result.put("events", paginatedEvents);
        result.put("total", total);
        result.put("page", page);
        result.put("limit", limit);
        
        return result;
    }

    public String exportEvents(Instant startDate, Instant endDate, String eventType, String userId, String format) {
        List<UserEvent> allEvents = repository.findAll();
        List<UserEvent> filteredEvents = allEvents.stream()
                .filter(event -> {
                    boolean matchesDateRange = true;
                    if (startDate != null && event.getEventTimestamp().isBefore(startDate)) {
                        matchesDateRange = false;
                    }
                    if (endDate != null && event.getEventTimestamp().isAfter(endDate)) {
                        matchesDateRange = false;
                    }
                    
                    boolean matchesEventType = (eventType == null || event.getEventType().equals(eventType));
                    boolean matchesUserId = (userId == null || event.getUserId().equals(userId));
                    
                    return matchesDateRange && matchesEventType && matchesUserId;
                })
                .collect(Collectors.toList());
        
        try {
            if ("csv".equals(format)) {
                return exportToCsv(filteredEvents);
            } else if ("json".equals(format)) {
                return exportToJson(filteredEvents);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error exporting data", e);
        }
        
        return "";
    }
    
    private String exportToCsv(List<UserEvent> events) {
        StringBuilder csv = new StringBuilder();
        csv.append("ID,User ID,Event Type,Event Timestamp,Metadata\n");
        
        DateTimeFormatter formatter = DateTimeFormatter.ISO_INSTANT;
        for (UserEvent event : events) {
            csv.append(String.format("%s,%s,%s,%s,%s\n",
                    event.getId() != null ? event.getId() : "",
                    event.getUserId() != null ? event.getUserId() : "",
                    event.getEventType() != null ? event.getEventType() : "",
                    event.getEventTimestamp() != null ? formatter.format(event.getEventTimestamp()) : "",
                    event.getMetadata() != null ? event.getMetadata().replace(",", ";") : ""
            ));
        }
        
        return csv.toString();
    }

    private String exportToJson(List<UserEvent> events) {
        try {
            return objectMapper.writeValueAsString(events);
        } catch (Exception e) {
            throw new RuntimeException("Error converting to JSON", e);
        }
    }

    public void deleteEvent(String id) {
        repository.deleteById(id);
    }
}