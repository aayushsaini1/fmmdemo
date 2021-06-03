import Head from "next/head";
import styles from "../styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function Home({ launches, miner, miners }) {
  console.log("miner:", miner);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>{miner.id}</h1>
        <p>owner: {miner.owner.address}</p>
        <p>worker: {miner.worker.address}</p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://miner-marketplace-backend.onrender.com/query",
    cache: new InMemoryCache()
  });
  const { data } = await client.query({
    query: gql`
      query {
        miner(id: "f02770") {
          id
          claimed
          location {
            region
            country
          }
          transparencyScore
          reputationScore
          owner {
            address
          }
          worker {
            address
          }
          personalInfo {
            name
            bio
          }
          pricing {
            storageAskPrice
          }
          service {
            serviceTypes {
              storage
            }
            dataTransferMechanism {
              online
            }
          }
        }
      }
    `
  });
  return {
    props: {
      launches: [],
      miner: data.miner,
      miners: []
    }
  };
}
