package com.shlomi.analytics.analytics_sdk_backend.controller;

import com.shlomi.analytics.analytics_sdk_backend.model.UserEvent;
import com.shlomi.analytics.analytics_sdk_backend.service.UserEventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
public class UserEventController {

    private final UserEventService service;

    public UserEventController(UserEventService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<UserEvent> createEvent(@RequestBody UserEvent event) {
        UserEvent saved = service.createEvent(event);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllEvents(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) String eventType,
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) String metadata,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int limit) {
        
        Instant start = (startDate != null) ? Instant.parse(startDate) : null;
        Instant end = (endDate != null) ? Instant.parse(endDate) : null;
        
        Map<String, Object> result = service.getFilteredEvents(start, end, eventType, userId, metadata, page, limit);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/export")
    public ResponseEntity<String> exportEvents(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) String eventType,
            @RequestParam(required = false) String userId,
            @RequestParam(defaultValue = "csv") String format) {
        
        Instant start = (startDate != null) ? Instant.parse(startDate) : null;
        Instant end = (endDate != null) ? Instant.parse(endDate) : null;
        
        String exportData = service.exportEvents(start, end, eventType, userId, format);
        
        HttpHeaders headers = new HttpHeaders();
        if ("csv".equals(format)) {
            headers.setContentType(MediaType.parseMediaType("text/csv"));
            headers.set("Content-Disposition", "attachment; filename=events.csv");
        } else if ("json".equals(format)) {
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Content-Disposition", "attachment; filename=events.json");
        }
        
        return ResponseEntity.ok().headers(headers).body(exportData);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable String id) {
        service.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }
}
