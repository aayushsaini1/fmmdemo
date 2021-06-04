import React, { Profiler } from "react";
import styles from "../styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { miners, miner } from "./index";

export default function Miner({ miner }) {
  console.log("Miner profile: ", miner);

  return (
    <div>
      <div className={styles.card}>
        <p>{miner.id}</p>
        <p>{miner.location.country}</p>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  //Next.js will get props from here
  //pass params from getStaticPath to getStaticProps to get content

  const { data } = await client.query({
    query: gql`
    query{
      miner(id: "${params.id}"){
        id,
        location{
          region,
          country
        }
      }
    }
    `,
  });

  return {
    props: {
      miner: data.miner,
    },
  };
}

export async function getOneMiner() {
  //one miner's data
  const client = new ApolloClient({
    uri: "https://miner-marketplace-backend.onrender.com/query",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      {
        miner(first: 1000) {
          id
        }
      }
    `,
  });

  return data.miners.map((m) => {
    return {
      params: {
        id: m.id,
      },
    };
  });
}

export async function getStaticPaths() {
  //Next.js will pre-render all the possible paths
  const paths = await getOneMiner();

  return {
    paths,
    fallback: true,
  };
}
