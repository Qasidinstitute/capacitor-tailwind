/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_REALM_APP_ID: 'sis-bnwtr',
    NEXT_PUBLIC_REALM_GRAPHQL: 'https://realm.mongodb.com/api/client/v2.0/app/sis-bnwtr/graphql',
}
}

module.exports = nextConfig
