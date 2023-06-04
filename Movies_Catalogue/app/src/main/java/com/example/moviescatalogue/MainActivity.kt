package com.example.moviescatalogue

import android.annotation.SuppressLint
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.ProgressBar
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivity : AppCompatActivity() {

    private val moviesList = mutableListOf<MoviesList>()
    lateinit var rvMoviesList: RecyclerView
    private lateinit var adapter: MoviesAdapter
    private lateinit var progressBar: ProgressBar

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        rvMoviesList = findViewById(R.id.rvMoviesList)
        progressBar = findViewById(R.id.progressBar)
        rvMoviesList.layoutManager = LinearLayoutManager(this)
        adapter = MoviesAdapter(moviesList, this)
        rvMoviesList.adapter = adapter
        getMovies()
    }

    @SuppressLint("NotifyDataSetChanged")
    private fun getMovies() {
        val moviesAPI = RetrofitHelper.getInstance().create(MoviesAPI::class.java)
        val moviesApiRequest = moviesAPI.getTop100Movies()
        moviesApiRequest.enqueue(object : Callback<List<MoviesList>> {
            override fun onResponse(
                call: Call<List<MoviesList>>,
                response: Response<List<MoviesList>>
            ) {
                val res = response.body()
                if (res != null) {
                    moviesList.addAll(res)
                    progressBar.visibility = View.GONE
                    adapter.notifyDataSetChanged()
                }
            }

            override fun onFailure(call: Call<List<MoviesList>>, t: Throwable) {
                Log.d("MAIN_ACTIVITY", "onError: $t")
            }
        })
    }
}