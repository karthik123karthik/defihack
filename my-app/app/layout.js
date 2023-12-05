"use client";

import { ToastContainer, toast } from "react-toastify";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Navbar from "../components/Navbar";
import styles from "./home.module.css";
import dynamic from "next/dynamic";
import Link from "next/link";



const defichain = {
  id: 1131,
  name: 'Defi',
  network: 'defichain',
  iconUrl: 'https://example.com/icon.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Defi',
    symbol: 'DFI',
  },
  rpcUrls: {
    public: { http: ['https://dmc.mydefichain.com/testnet'] },
    default: { http: ['https://dmc.mydefichain.com/testnet'] },
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://blockscout.testnet.ocean.jellyfishsdk.com/' },
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11_907_934,
    },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [defichain, chain.polygonMumbai, chain.polygon, chain.optimism, chain.arbitrum],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const metadata = {
  title: "Landly",
  description: "It is about the registration on blockchain",
  keyword: "solidity, ethereum, land, registration, Blockchain",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
<link href="https://fonts.googleapis.com/css2?family=Bungee&family=Caveat&family=Titan+One&display=swap" rel="stylesheet"></link>
      <body className={styles.container}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <Navbar />
            {children}
            <ToastContainer
              theme="dark"
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </RainbowKitProvider>
        </WagmiConfig>
      </body>

       </html>
  );
}

// export default dynamic(() => Promise.resolve(RootLayout), { ssr: false });



