import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const foods = [
    { name: "Chinese", img: "/chinese.jpg" },
    { name: "Indian", img: "/indian.jpg" },
    { name: "Japanese", img: "/japanese.jpg" },
    { name: "Korean", img: "/korean.jpg" },
    { name: "American", img: "/american.jpg" }
  ];

  return (
    <>
      <Head>
        <title>Voting Platform</title>
      </Head>

      <main className={`${styles.main} ${inter.className}`}>
        <h1>About Me</h1>

        <img src="/IMG_7075.jpg" width="250" height="300"/>

        <h2 style={{ margin: "20px"}}>
          Welcome! My name is Kenneth Huang. This website allows users to vote 
          on what type of food I should eat for the rest of my life. Below are the options.
        </h2>

        <div className={styles.container}>
          {foods.map((food) => (
            <div
              key={food.name}
              className={styles.option}
              style={{ background: "transparent" }}
            >
              <img
                src={food.img}
                width="240"
                height="160"
              />
              <h1 style={{ color: "white", display: "flex", justifyContent: "center"}}>{food.name}</h1>
            </div>
          ))}
        </div>

        <h2 style={{ margin: "20px"}}>Go to Voting Platform to cast your vote</h2>
      </main>
    </>
  )
}