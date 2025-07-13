package com.example.analytics_sdk_and;

import com.example.analytics_sdk_and.model.UserEvent;
import com.example.analytics_sdk_and.network.UserEventApi;

import java.util.List;
import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class AnalyticsSdk {

    private static AnalyticsSdk instance;
    private UserEventApi api;

    private AnalyticsSdk(String baseUrl) {
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseUrl)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        api = retrofit.create(UserEventApi.class);
    }


    public static AnalyticsSdk getInstance(String baseUrl) {
        if (instance == null)
            instance = new AnalyticsSdk(baseUrl);
        return instance;
    }


    public void sendEvent(UserEvent event, final AnalyticsCallback<UserEvent> callback) {
        Call<UserEvent> call = api.createEvent(event);
        call.enqueue(new Callback<UserEvent>() {
            @Override
            public void onResponse(Call<UserEvent> call, Response<UserEvent> response) {
                if (response.isSuccessful() && response.body() != null)
                    callback.onSuccess(response.body());
                else
                    callback.onError(new Exception("Response unsuccessful or empty"));
            }

            @Override
            public void onFailure(Call<UserEvent> call, Throwable t) {
                callback.onError(t);
            }
        });
    }


    public void getAllEvents(final AnalyticsCallback<List<UserEvent>> callback) {
        Call<List<UserEvent>> call = api.getAllEvents();
        call.enqueue(new Callback<List<UserEvent>>() {
            @Override
            public void onResponse(Call<List<UserEvent>> call, Response<List<UserEvent>> response) {
                if (response.isSuccessful() && response.body() != null)
                    callback.onSuccess(response.body());
                else
                    callback.onError(new Exception("Response unsuccessful or empty"));
            }

            @Override
            public void onFailure(Call<List<UserEvent>> call, Throwable t) {
                callback.onError(t);
            }
        });
    }


    public void deleteEvent(String id, final AnalyticsCallback<Void> callback) {
        Call<Void> call = api.deleteEvent(id);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful())
                    callback.onSuccess(null);
                else
                    callback.onError(new Exception("Response unsuccessful"));
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                callback.onError(t);
            }
        });
    }


    public interface AnalyticsCallback<T> {
        void onSuccess(T result);
        void onError(Throwable t);
    }
}

