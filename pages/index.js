import React, { useEffect, useState } from "react";
import * as Realm from 'realm-web';
import RealmContext from '../lib/RealmContext';
import Users from "../components/Users";
import Names from "../components/Names";

export default function Home() {
  const [client, setClient] = useState( null );
  const [user, setUser] = useState( null );
  const [app, setApp] = useState( new Realm.App({ id: process.env.NEXT_PUBLIC_REALM_APP_ID }) );

  useEffect( () => {
    async function init () {
      if ( !user ) {
        setUser( app.currentUser ? app.currentUser : await app.logIn( Realm.Credentials.anonymous() ) );
      }

      if ( !client ) {
        setClient( app.currentUser.mongoClient( 'mongodb-atlas' ) );
      }
    }

    init();
  }, [app, client, user] );

  function renderComponent ( Component, additionalProps = {} ) {
    return <RealmContext.Consumer>{
      (realmContext) => <Component realmContext={realmContext} {...additionalProps} />
    }</RealmContext.Consumer>
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <Names />
      <RealmContext.Provider value={{app, client, user, setClient, setUser, setApp}}>
       {renderComponent(Users)}
      </RealmContext.Provider>
    </div>
  );
}
