package com.example.analytics_sdk_and.model;

import java.util.Map;

public class UserEvent {
    private String id;
    private String eventType;
    private long timestamp;
    private Map<String, Object> metadata;

    public UserEvent() {}

    public UserEvent(String eventType, long timestamp, Map<String, Object> metadata) {
        this.eventType = eventType;
        this.timestamp = timestamp;
        this.metadata = metadata;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getEventType() {
        return eventType;
    }
    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public long getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public Map<String, Object> getMetadata() {
        return metadata;
    }
    public void setMetadata(Map<String, Object> metadata) {
        this.metadata = metadata;
    }
}
