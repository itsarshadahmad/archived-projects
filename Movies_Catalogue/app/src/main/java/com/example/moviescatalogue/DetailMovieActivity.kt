package com.example.moviescatalogue

import android.annotation.SuppressLint
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import com.bumptech.glide.Glide
import com.example.moviescatalogue.databinding.ActivityDetailMovieBinding

class DetailMovieActivity : AppCompatActivity() {
    lateinit var binding: ActivityDetailMovieBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_detail_movie)

        @Suppress("Deprecation") val movieData =
            intent.getParcelableExtra("MovieData") as MoviesList?

        if (movieData != null) {
            binding.apply {

                Glide.with(this@DetailMovieActivity).load(movieData.image)
                    .into(ivCoverPoster)

                tvMovieName.text = movieData.title
                val directors = movieData.director.joinToString(separator = ", ") {
                    it
                }
                tvDirectorName.text = directors
                Log.d("DETAIL_MOVIE_ACTIVITY", "onCreate: \n$directors")
                tvImdbRating.text = movieData.rating
                tvGenre.text = movieData.genre.joinToString(separator = ", ") {
                    it
                }
                tvYear.text = movieData.year.toString()
                tvDescription.text = movieData.description
            }
        }

    }
}