import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import styles from "../styles/Polychromatic.module.css";

export default function Polychromatic() {
  const [image, setImage] = useState([]);
  const [images, setImages] = useState([]);
  const [time, setTime] = useState("loading");
  const [date, setDate] = useState("");
  const [coords, setCoords] = useState({});

  const apiKey = "uzoA9GLaSXhs4YnowW2dOhRRuivdIhdsetie6rqI";
  const url = `https://epic.gsfc.nasa.gov/api/natural?api_key=${apiKey}`;

  const getPolychromaticData = async () => {
    const res = await axios.get(url);
    const data = await res.data;
    console.log(data);

    const caption = data[0].caption;
    const date = data[0].date.split(" ")[0];
    const date_formatted = date.replaceAll("-", "/");

    let times = [];
    let images = [];

    for (let i = 0; i < data.length; i++) {
      let time = data[i].date.split(" ")[1];
      console.log(time)
      let coords = data[i].centroid_coordinates;
      let imageGrabbed = data[i].image;
      let image = `https://epic.gsfc.nasa.gov/archive/natural/${date_formatted}/png/${imageGrabbed}.png`;
      times.push(time);
      images.push({
        image: image,
        time: time,
        coords: coords,
      });
    }

    setDate(date);
    setImages(images);
    setImage(images[0].image);
    setTime(images[0].time);
    setCoords([images[0].coords.lat, images[0].coords.lon]);
    // console.log(image);
  };

  useEffect(() => {
    getPolychromaticData();
  }, []);

  return (
    <>
      <Head>
        <title>Nasa Application</title>
        <meta name="description" content="Polychromatic" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <img alt={image} src={image} width={200} height={200} />
          <div>
            <div>Time: {time}</div>
            <div>Coordinates: {coords[0]}, {coords[1]}</div>
          </div>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Time</th>
              <th className={styles.th}>Latitude</th>
              <th className={styles.th}>Longitude</th>
              <th className={styles.th}>Image</th>
            </tr>
          </thead>
          <tbody>
            {images.map((e, i) => {
              return (
                <tr key={i}>
                  <td className={styles.td}>{e.time}</td>
                  <td className={styles.td}>{e.coords.lat}</td>
                  <td className={styles.td}>{e.coords.lon}</td>
                  <td className={styles.td}>
                    <div className={styles.imageCont}>
                      <Image
                        src={e.image}
                        alt={i}
                        width={200}
                        height={200}
                      />
                      <button
                        onClick={() => {
                          setImage(e.image);
                          setTime(e.time);
                          setCoords([e.coords.lat, e.coords.lon]);
                          console.log(images[i].image);
                          document.body.scrollIntoView();
                        }}
                      >View</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
}
