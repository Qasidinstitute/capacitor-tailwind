import useSWR from "swr";
import React, { useEffect, useState } from "react";
import * as Realm from "realm-web";
import RealmContext from '../lib/RealmContext';
import { generateAuthHeader } from '../lib/RealmClient';
import { isAnon } from "../utils/anon";

function findPrograms() {
  const fetch = async ( query ) =>
    fetch( process.env.NEXT_PUBLIC_REALM_GRAPHQL, {
      method: 'GET',
      headers: await generateAuthHeader(),
      body: JSON.stringify({ query }),
    } ).then( ( res ) => res.json() );

  const FIND_GRADES = `
    query {
      programs(query: { order: 2 }) {
        _id
      }
    }`

  const { data, error } = useSWR( FIND_GRADES, fetch );

  console.log(data)

  return {
    programs: data,
    isLoading: !error && !data,
    isError: error
  }
}

function Users ({realmContext: {app, user, setUser}}) {
  const loggedIn = !isAnon(user);

  const { programs, isLoading, isError } = findPrograms();

  console.log(programs)

  return (
    <div>
    </div>
  )
}

export default Users;
