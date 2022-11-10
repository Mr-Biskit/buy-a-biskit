import abi from "../utils/BuyABiskit.json";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { FaCookieBite, FaLightbulb, FaInfo } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  // Component
  const BiskitIcon = ({ icon }) => {
    return <div className="biskit-icon">{icon}</div>;
  };

  // Contract Address & ABI
  const contractAddress = "0x441E9B7CBD651A4C3469A5B52C87D6D7141532e0";
  const contractABI = abi.abi;

  // Component state
  const [currentAccount, setCurrentAccount] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [memos, setMemos] = useState([]);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // Wallet connection logic
  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;

      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("accounts: ", accounts);

      if (accounts.length > 0) {
        const account = accounts[0];
        console.log("wallet is connected! " + account);
      } else {
        console.log("make sure MetaMask is connected");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("please install MetaMask");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const buyBiskit = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const buyABiskit = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("buying biskit..");
        const biskitTxn = await buyABiskit.buyBiskit(
          name ? name : "anon",
          message ? message : "Enjoy your biskit!",
          { value: ethers.utils.parseEther("0.001") }
        );

        await biskitTxn.wait();

        console.log("mined ", biskitTxn.hash);

        console.log("biskit purchased!");

        // Clear the form fields.
        setName("");
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buyBigBiskit = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const buyABiskit = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("buying biskit..");
        const biskitTxn = await buyABiskit.buyBiskit(
          name ? name : "anon",
          message ? message : "Enjoy your biskit!",
          { value: ethers.utils.parseEther("0.005") }
        );

        await biskitTxn.wait();

        console.log("mined ", biskitTxn.hash);

        console.log("biskit purchased!");

        // Clear the form fields.
        setName("");
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let buyABiskit;
    isWalletConnected();

    const onNewMemo = (from, timestamp, name, message) => {
      console.log("Memo received: ", from, timestamp, name, message);
      setMemos((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message,
          name,
        },
      ]);
    };

    const { ethereum } = window;

    // Listen for new memo events.
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      const signer = provider.getSigner();
      buyABiskit = new ethers.Contract(contractAddress, contractABI, signer);

      buyABiskit.on("NewMemo", onNewMemo);
    }

    return () => {
      if (buyABiskit) {
        buyABiskit.off("NewMemo", onNewMemo);
      }
    };
  }, []);

  return (
    <div
      class="relative bg-[url('../images/background.jpeg')] bg-cover
     bg-center flex h-screen"
    >
      <title>Buy A Biskit!</title>
      <meta name="description" content="Tipping site" />
      <link rel="icon" href="/biskit.ico" />

      <main class="flex-auto">
        <div class="justify-center items-center flex absolute left-0 top-0 h-20 w-20 bg-gray-900 m-8 bg-opacity-75 rounded-lg">
          <Link href="/ideaTank">
            <a>
              <BiskitIcon icon={<FaLightbulb />} />
            </a>
          </Link>
        </div>
        <div class="justify-center items-center flex absolute right-0 top-0 h-20 w-20 bg-gray-900 m-8 bg-opacity-75 rounded-lg">
          <Link href="/about">
            <a>
              <BiskitIcon icon={<FaInfo />} />
            </a>
          </Link>
        </div>

        <h1 class="text-gray-100 flex justify-center items-center m-10 text-large font-gorilla ">
          Buy A Biskit!
        </h1>

        {currentAccount ? (
          <div class="max-w-screen-xl mx-auto px-4">
            <div class="-mx-4 flex flex-wrap">
              <div class="w-full flex flex-col p-4 sm:w-1/2 lg:w-1/3">
                <div class="flex-1 px-10 py-12 rounded-lg shadow-lg  bg-gray-900 bg-opacity-75">
                  <label class="text-gray-100 block mb-2 text-medium font-medium font-gorilla">
                    Name
                  </label>
                  <br />

                  <input
                    class="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    onChange={onNameChange}
                  />
                </div>
              </div>
              <br />
              <div class="w-full flex flex-col p-4 sm:w-1/2 lg:w-1/3">
                <div class="flex-1 px-10 py-12 bg-gray-900 bg-opacity-75 rounded-lg shadow-lg">
                  <label class="text-gray-100 block mb-2 text-medium font-medium font-gorilla">
                    Add an Idea For a Web3 Project
                  </label>
                  <br />

                  <textarea
                    class="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    rows={3}
                    placeholder="Enjoy your biskit!"
                    id="message"
                    onChange={onMessageChange}
                    required
                  ></textarea>
                </div>
              </div>
              <div class="w-full flex flex-col p-4 sm:w-1/2 lg:w-1/3">
                <div class="flex-1 px-10 py-1 rounded-lg shadow-lg bg-gray-900 bg-opacity-75 flex-col space-y-4">
                  <div class="l-1/4 flex flex-col">
                    <label class="flex justify-center items-center text-gray-100 font-gorilla">
                      Buy a Biskit: 0.001ETH
                    </label>
                  </div>
                  <div class="l-1/4 flex flex-col">
                    <button
                      class="text-blue-700 border border-gray-100 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-gray-100 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
                      type="button"
                      onClick={buyBiskit}
                    >
                      <BiskitIcon icon={<FaCookieBite size="20" />} />
                    </button>
                  </div>
                  <div class="l-1/4  flex flex-col">
                    <label class="flex justify-center items-center text-gray-100 font-gorilla">
                      Buy a Large Biskit: 0.005ETH
                    </label>
                  </div>
                  <div class="l-1/4 flex flex-col">
                    <button
                      class="text-blue-700 border border-gray-100 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-gray-100 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
                      type="button"
                      onClick={buyBigBiskit}
                    >
                      <BiskitIcon icon={<FaCookieBite size="38" />} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div class="p-12 flex justify-center items-center">
            <button
              class="text-button h-36 bg-gray-900 bg-opacity-75 hover:bg-gray-900 hover:bg-opacity-80 text-gray-100 font-bold hover:text-white py-2 px-4 border border-gray-100 rounded mt-16"
              onClick={connectWallet}
            >
              {" "}
              Connect your wallet{" "}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
