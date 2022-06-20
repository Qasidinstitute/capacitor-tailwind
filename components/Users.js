import useSWR from "swr";
import { request } from 'graphql-request';
import * as Realm from "realm-web";
import RealmContext from '../lib/RealmContext';
import { generateAuthHeader } from '../lib/RealmClient';
import { isAnon } from "../utils/anon";

const fetcher = async ( query ) =>
  fetch( process.env.NEXT_PUBLIC_REALM_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': await generateAuthHeader().then( data => { return data.Authorization } ),
    },
    body: JSON.stringify({ query })
  }).then( data => { data.json() } ).catch( e => { console.log( e ) } );


  const FIND_GRADES = `query {
    programs(query: { sort: _id }) {
    _id
    }
  }`

function findPrograms() {

  const { data, error } = useSWR(FIND_GRADES, fetcher);

  const token = async () => generateAuthHeader().then( res => { console.log( res ) } )

  console.log(token)

  return {
    programs: data,
    isLoading: !error && !data,
    isError: error
  }
}

function Users ({realmContext: {app, user, setUser}}) {
  const loggedIn = !isAnon( user );

  const { programs, isLoading, isError } = findPrograms();

  return (
    <div>
    </div>
  )
}

export default Users;
