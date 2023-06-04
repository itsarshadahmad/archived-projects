package com.example.moviescatalogue

import retrofit2.Call
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Headers

const val RAPID_API_BASE_URL = "https://imdb-top-100-movies.p.rapidapi.com"
const val RAPID_API_KEY = BuildConfig.RAPID_API_KEY
const val RAPID_API_HOST = BuildConfig.RAPID_API_HOST

interface MoviesAPI {
    @Headers("X-RapidAPI-Key: $RAPID_API_KEY", "X-RapidAPI-Host: $RAPID_API_HOST")
    @GET("/")
    fun getTop100Movies(): Call<List<MoviesList>>
}

object RetrofitHelper {
    fun getInstance(): Retrofit {
        return Retrofit.Builder().baseUrl(RAPID_API_BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }
}