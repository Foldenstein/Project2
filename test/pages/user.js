import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser
} from '@clerk/nextjs'
import { useState } from 'react'
import { ethers } from 'ethers'
import styles from '../styles/Home.module.css'

export default function UserPage() {
  const { isSignedIn } = useUser()

  const [wallet, setWallet] = useState(null)

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Install MetaMask first.")
      return
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      })

      setWallet(accounts[0])
      window.localStorage.setItem("wallet", accounts[0])

    } catch (err) {
      console.error(err)
      alert("Connection failed")
    }
  }

  return (
    <div style={{ padding: "300px" }}>
      <h1>Come and Join MetaMask</h1>

      <p style={{ marginBottom: "10px" }}>
        *Required to participate in voting
      </p>

      {!isSignedIn && (
        <>
          <SignInButton mode="modal">
            <button style={{ fontSize: "30px", backgroundColor: "green" }}>
              Login
            </button>
          </SignInButton>
        </>
      )}

      {isSignedIn && (
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <UserButton afterSignOutUrl="/" />
            <p style={{ marginLeft: "10px" }}>You are signed in</p>
          </div>

          <button
            onClick={connectWallet}
            style={{marginTop: "20px", backgroundColor: "green"}}
          >
            {wallet
              ? "Wallet Connected"
              : "Connect Wallet"}
          </button>
        </>
      )}
    </div>
  )
}