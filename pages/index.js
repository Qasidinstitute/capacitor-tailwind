import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/getuser", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  console.log(data);
  return (
    <div className="flex justify-center flex-col items-center">
      <img src="./qasid_logo.webp" className="w-32 m-4" />
      <p className="font-serif text-lg">Welcome to SIS</p>
      <p className="font-serif text-lg">Qasid’s Student Information System</p>
      <figure className="bg-slate-100 rounded-xl p-8 dark:bg-slate-800 max-w-md mt-5">
        <img
          className="w-24 h-24 rounded-full mx-auto"
          src={data.results[0].picture.medium}
          alt=""
          width="384"
          height="512"
        />
        <div className="pt-6 text-center space-y-4">
          <blockquote>
            <p className="text-lg font-medium">
              {data.results[0].location.street.number}{" "}
              {data.results[0].location.street.name},{" "}
              {data.results[0].location.city},{" "}
              {data.results[0].location.country}
            </p>
          </blockquote>
          <figcaption className="font-medium">
            <div className="text-sky-500 dark:text-sky-400">
              {data.results[0].name.title} {data.results[0].name.first}{" "}
              {data.results[0].name.last}
            </div>
            <div className="text-slate-700 dark:text-slate-500">
              {data.results[0].dob.age}, {data.results[0].gender}
            </div>
          </figcaption>
        </div>
      </figure>
    </div>
  );
}
