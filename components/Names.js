import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { Storage } from "@capacitor/storage";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function saveName() {
  const { data, error } = useSWR(
    "https://randomuser.me/api/?format=json",
    fetcher
  );

  return {
    names: data,
    isLoading: !error && !data,
    isError: error
  }
}

function Names() {
  const { names, isLoading, isError } = saveName();

  const checkName = async () => {
    const { value } = await Storage.get({ key: "name" });
    console.log(`Hello ${value}!`);
    setNameStore(value);
    return value;
  };

  const [nameStore, setNameStore] = useState("");

  const setName = async (name) => {
    await Storage.set({
      key: "name",
      value: name,
    });
  };

  if (isError) return <div>failed to load</div>;
  if (!names) return <div>loading...</div>;

  return (
    <div className="flex justify-center flex-col items-center">

      <img src="./qasid_logo.webp" className="w-32 m-4" />
      <p className="font-serif text-lg">Welcome to SIS</p>
      <p className="font-serif text-lg">Qasid’s Student Information System</p>
      <figure className="bg-slate-100 rounded-xl p-8 dark:bg-slate-800 max-w-md mt-5">
        <img
          className="w-24 h-24 rounded-full mx-auto"
          src={names.results[0].picture.medium}
          alt=""
          width="384"
          height="512"
        />
        <div className="pt-6 text-center space-y-4">
          <blockquote>
            <p className="text-lg font-medium">
              {names.results[0].location.street.number}{" "}
              {names.results[0].location.street.name},{" "}
              {names.results[0].location.city},{" "}
              {names.results[0].location.country}
            </p>
          </blockquote>
          <figcaption className="font-medium">
            <div className="text-sky-500 dark:text-sky-400">
              {names.results[0].name.title} {names.results[0].name.first}{" "}
              {names.results[0].name.last}
            </div>
            <div className="text-slate-700 dark:text-slate-500">
              {names.results[0].dob.age}, {names.results[0].gender}
            </div>
          </figcaption>
        </div>
      </figure>
      <button
        className="h-10 px-6 font-semibold rounded-full bg-indigo-500 text-white m-2"
        onClick={() => setName(names.results[0].name.first)}
      >
        Save Name
      </button>
      <button
        className="h-10 px-6 font-semibold rounded-full bg-indigo-500 text-white"
        onClick={() => checkName()}
      >
        Check Name
      </button>
      <div className="text-lg font-medium">{nameStore}</div>
    </div>
  );
}

export default Names;
