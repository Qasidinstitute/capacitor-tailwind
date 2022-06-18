import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { isAnon } from "../utils/anon";

const fetch = async ( query ) =>
  fetch( REALM_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: await generateAuthHeader(),
    body: JSON.stringify({ query }),
  } ).then( ( res ) => res.json() );

const FIND_MOVIES = `
  query FindMovies{
    movies(query: { year: 2014, rated: "PG" } ) {
      title
      year
      runtime
    }
  }
`
function checkMovies() {
  const { data, error } = useSWR( FIND_MOVIES, fetch );

  return {
    movies: data,
    isMovieLoading: !error && !data,
    isMovieError: error
  }
}

function Users ({user}) {
  const loggedIn = !isAnon(user);
  const { movies, isMovieLoading, isMovieError } = checkMovies();

  console.log(user)

  const movie = movies ? movies.data.movies : null;

  return (
    <div>
      {console.log(movies)}
    </div>
  )
}

export default Users;
