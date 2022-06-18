import React from 'react';

const RealmContext = React.createContext({
    app: null,
    client: null,
    user: null,
    setApp: () => {},
    setClient: () => {},
    setUser: () => {}
});

export default RealmContext;
