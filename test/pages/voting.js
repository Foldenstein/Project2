import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [selectedFood, setSelectedFood] = useState(null)
  const [wallet, setWallet] = useState(null)
  const [results, setResults] = useState([])

  const CONTRACT_ADDRESS = "0x5216459D35Bb1e88564C7208B10A8CB9FBeB7d12"

  const ABI = [
    "function vote(uint foodIndex)",
    "function getFoods() view returns (tuple(string name, uint voteCount)[])",
    "function hasUserVoted(address user) view returns (bool)"
  ]

  const foods = [
    { name: "Chinese", img: "/chinese.jpg" },
    { name: "Indian", img: "/indian.jpg" },
    { name: "Japanese", img: "/japanese.jpg" },
    { name: "Korean", img: "/korean.jpg" },
    { name: "American", img: "/american.jpg" }
  ]

  useEffect(() => {
    const savedWallet = localStorage.getItem("wallet")
    if (savedWallet) setWallet(savedWallet)
  }, [])

  const getReadContract = () => {
    const provider = new ethers.BrowserProvider(window.ethereum)
    return new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
  }

  const getWriteContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
  }

  const fetchResults = async () => {
    try {
      const contract = getReadContract()
      const data = await contract.getFoods()
      setResults(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchResults()
  }, [])

  const handleSubmit = async () => {
    if (!selectedFood) {
      alert("Please select a food first!")
      return
    }

    if (!wallet) {
      alert("Connect wallet first!")
      return
    }

    try {
      const contract = await getWriteContract()

      const foodIndex = foods.findIndex(f => f.name === selectedFood)

      const tx = await contract.vote(foodIndex)

      alert("Transaction sent... waiting confirmation")

      await tx.wait()

      alert("Vote successful!")

      fetchResults()

    } catch (err) {
      console.error(err)
      alert(err.reason || "Transaction failed")
    }
  }

  return (
    <>
      <Head>
        <title>Voting Platform</title>
      </Head>

      <main className={`${styles.main} ${inter.className}`}>

        <h1 style={{ fontSize: "72px" }}>Cast Your Vote</h1>

        <div className={styles.container}>
          {foods.map((food) => (
            <button
              key={food.name}
              onClick={() => setSelectedFood(food.name)}
              className={styles.option}
              style={{
                border: selectedFood === food.name ? "4px solid green" : "none"
              }}
            >
              <img src={food.img} width="240" height="160" />
              <h1 style={{ color: "black" }}>{food.name}</h1>
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          style={{
            width: "20%",
            fontSize: "48px",
            margin: "20px",
            backgroundColor: "green"
          }}
        >
          Submit
        </button>

        <h2>Live Results</h2>

        {results.map((food, i) => (
          <p key={i}>
            {food.name}: {food.voteCount.toString()} votes
          </p>
        ))}

      </main>
    </>
  )
}