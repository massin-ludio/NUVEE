import React from "react"

export default function SearchCodeMov({ movie, chooseMovie }) {
  function handlePlay() {
    chooseMovie(movie)
  }

  const image = "https://image.tmdb.org/t/p/original";

  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
    >
      <img onClick={handlePlay}  src={image + movie.poster_path} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div>{movie.title}</div>
        <div className="text-muted">{movie.original_title}</div>
      </div>
    </div>

  )
}
