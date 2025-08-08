package com.shlomi.analytics.analytics_sdk_backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user_events")
public class UserEvent {

    @Id
    private String id;
    private String userId;
    private String eventType;
    private Instant eventTimestamp;
    private String metadata;

    public UserEvent(String userId, String eventType, Instant eventTimestamp, String metadata) {
        this.userId = userId;
        this.eventType = eventType;
        this.eventTimestamp = eventTimestamp;
        this.metadata = metadata;
    }
}