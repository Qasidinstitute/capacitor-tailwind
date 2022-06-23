import { useContext, useEffect, useState } from 'react';
import useSWR from "swr";
import * as Realm from "realm-web";
import RealmContext from '../lib/RealmContext';
import { isAnon } from "../utils/anon";

const query = `
    {
      programs {
        _id
      }
    }
  `

const fetcher = async () => fetch(
  process.env.NEXT_PUBLIC_REALM_GRAPHQL + '?query=' + encodeURIComponent(query), {
    method: 'GET',
    headers: {
      contentType: 'application/json',
      apiKey: "KX7quS1GK13d8M6TXFUihbIBK9kntDcvlQmKsglvoeLMVdQs9ZKAo8DOlfYC2ovZ",
    },
  }).then( res => res.json() );

function Users ({realmContext: {app, client, user}}) {
  const loggedIn = !isAnon( user );
  const [names, setNames] = useState( null );

  const { data, error } = useSWR(
      process.env.NEXT_PUBLIC_REALM_GRAPHQL,
      fetcher
    );

  console.log(data)

  return (
    <div>
    {Object.keys(data.data.programs).map((key, index) => {
        return (
          <div key={index}>
            <h2>
              {key}
            </h2>

            <hr />
          </div>
        );
      })}
    </div>
  )
}

export default Users;
