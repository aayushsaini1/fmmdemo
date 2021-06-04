import Head from "next/head";
import styles from "../styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useRouter } from "next/router";

export default function Home({ miner }) {
  // console.log("Miner:", miner);
  console.log("Miner:", miner);
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          {miner.map((miners) => (
            <a onClick={() => router.push(miners.id)}>
              <div className={styles.card}>
                <p>{miners.id}</p>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://miner-marketplace-backend.onrender.com/query",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        miners {
          id
          claimed
        }
      }
    `,
  });
  return {
    props: {
      miner: data.miners,
    },
  };
}
