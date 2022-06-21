import useSWR from "swr";
import { request } from 'graphql-request';
import * as Realm from "realm-web";
import RealmContext from '../lib/RealmContext';
import { generateAuthHeader } from '../lib/RealmClient';
import { isAnon } from "../utils/anon";

const FIND_GRADES = `query {
  programs(query: { sort: _id }) {
  _id
  }
}`

const fetcher = async () => fetch({
  method: "POST",
  headers: {
    //contentType: 'application/json',
    apiKey: "KX7quS1GK13d8M6TXFUihbIBK9kntDcvlQmKsglvoeLMVdQs9ZKAo8DOlfYC2ovZ"
  },
  body: { query: JSON.stringify(FIND_GRADES) },
}).then( (res) => JSON.stringify(res) ).catch( (e) => console.log(JSON.stringify(e)) );

const findPrograms = async () => {
  const { data, error } = useSWR( process.env.NEXT_PUBLIC_REALM_GRAPHQL, fetcher );

  console.log(data)

  return {
    programs: data,
    isLoading: !error && !data,
    isError: error
  }
}

function Users ({realmContext: {app, user, setUser}}) {
  const loggedIn = !isAnon( user );

  const { programs, isLoading, isError } = findPrograms();

  //console.log(findPrograms())
  //console.log(programs)

  return (
    <div>
    </div>
  )
}

export default Users;
