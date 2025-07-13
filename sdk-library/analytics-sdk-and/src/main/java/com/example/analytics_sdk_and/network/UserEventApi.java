package com.example.analytics_sdk_and.network;

import com.example.analytics_sdk_and.model.UserEvent;
import java.util.List;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface UserEventApi {

    @POST("/api/events")
    Call<UserEvent> createEvent(@Body UserEvent event);

    @GET("/api/events")
    Call<List<UserEvent>> getAllEvents();
    
    @DELETE("/api/events/{id}")
    Call<Void> deleteEvent(@Path("id") String id);

}