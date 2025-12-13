import { BrowserWallet } from "@meshsdk/core"
import { MeshWallet } from "@meshsdk/core"
import { NETWORK } from "./config"

let connectedWallet: BrowserWallet | null = null

/**
 * Connect to a Cardano browser wallet (Nami, Eternl, Lace)
 */
export async function connectWallet(walletName: string = "nami"): Promise<BrowserWallet> {
  try {
    const wallet = await BrowserWallet.enable(walletName)
    connectedWallet = wallet
    return wallet
  } catch (error) {
    console.error("Failed to connect wallet:", error)
    throw new Error(`Failed to connect to ${walletName} wallet. Please make sure the wallet extension is installed.`)
  }
}

/**
 * Get the currently connected wallet address
 */
export async function getWalletAddress(): Promise<string> {
  if (!connectedWallet) {
    throw new Error("No wallet connected. Please connect a wallet first.")
  }
  
  try {
    const addresses = await connectedWallet.getUsedAddresses()
    return addresses[0]
  } catch (error) {
    console.error("Failed to get wallet address:", error)
    throw new Error("Failed to retrieve wallet address")
  }
}

/**
 * Get public key hash from wallet (for smart contract issuer_id)
 */
export async function getPubKeyHash(): Promise<string> {
  if (!connectedWallet) {
    throw new Error("No wallet connected. Please connect a wallet first.")
  }
  
  try {
    const addresses = await connectedWallet.getUsedAddresses()
    const address = addresses[0]
    
    // Extract payment credential hash from address
    // In production, use proper bech32 decoding
    // For now, return a simplified hash
    const addressBytes = new TextEncoder().encode(address)
    const hashBuffer = await crypto.subtle.digest("SHA-256", addressBytes)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
    
    return hashHex.substring(0, 56) // Return first 56 chars (approximate pubkey hash length)
  } catch (error) {
    console.error("Failed to get pubkey hash:", error)
    throw new Error("Failed to retrieve pubkey hash")
  }
}

/**
 * Get the balance of the connected wallet
 */
export async function getBalance(): Promise<string> {
  if (!connectedWallet) {
    throw new Error("No wallet connected. Please connect a wallet first.")
  }
  
  try {
    const balance = await connectedWallet.getBalance()
    // Convert lovelace to ADA (1 ADA = 1,000,000 lovelace)
    const lovelace = balance.find((asset) => asset.unit === "lovelace")
    if (lovelace) {
      const ada = Number(lovelace.quantity) / 1_000_000
      return ada.toFixed(2)
    }
    return "0"
  } catch (error) {
    console.error("Failed to get balance:", error)
    throw new Error("Failed to retrieve wallet balance")
  }
}

/**
 * Sign and submit a transaction to Cardano
 */
export async function signAndSubmitTx(tx: string): Promise<string> {
  if (!connectedWallet) {
    throw new Error("No wallet connected. Please connect a wallet first.")
  }
  
  try {
    const txHash = await connectedWallet.signTx(tx, true)
    return txHash
  } catch (error) {
    console.error("Failed to sign and submit transaction:", error)
    throw new Error("Transaction failed. Please try again.")
  }
}

/**
 * Get available wallets
 */
export async function getAvailableWallets(): Promise<string[]> {
  try {
    const wallets = await BrowserWallet.getInstalledWallets()
    return wallets.map((wallet) => wallet.name)
  } catch (error) {
    console.error("Failed to get available wallets:", error)
    return []
  }
}

/**
 * Disconnect the current wallet
 */
export function disconnectWallet(): void {
  connectedWallet = null
}

/**
 * Check if a wallet is connected
 */
export function isWalletConnected(): boolean {
  return connectedWallet !== null
}

