import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState();

  const apiKey = "uzoA9GLaSXhs4YnowW2dOhRRuivdIhdsetie6rqI";
  const url = `https://api.nasa.gov/techtransfer/patent/?q=10&engine&api_key=${apiKey}`;

  const getTechTransferData = async () => {
    const res = await axios.get(url);
    const info = await res.data;
    console.log(info);
    setData(info);
  };

  useEffect(() => {
    getTechTransferData();
  }, []);

  return (
    <>
      <Head>
        <title>Nasa Application</title>
        <meta name="description" content="Create Nasa Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <Link href={"/polychromatic"}>Polychromatic</Link>
        </div>
        <div className={styles.container}>
          {data &&
            data.results.map((tech, index) => {
              return (
                <div key={index}>
                  {tech &&
                    tech.map((t, ind) => {
                      if (ind === 10) {
                        return (
                          <Image
                            src={t}
                            alt={t}
                            key={ind}
                            width={200}
                            height={200}
                          />
                        );
                      }
                    })}
                </div>
              );
            })}
        </div>
      </main>
    </>
  );
}
