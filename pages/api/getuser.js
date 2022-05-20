// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const result = await fetch(`https://randomuser.me/api/?format=json`);
  const data = await result.json();
  res.status(200).json(data);
}
