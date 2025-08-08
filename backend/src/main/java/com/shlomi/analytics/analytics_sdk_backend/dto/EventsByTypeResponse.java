package com.shlomi.analytics.analytics_sdk_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventsByTypeResponse {
    private String eventType;
    private long count;
}
