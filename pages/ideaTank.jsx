import SliderCard from "../components/SliderCard";
import {
  FaCookieBite,
  FaLightbulb,
  FaInfo,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../utils/BuyABiskit.json";
import Link from "next/link";

export default function IdeaTank() {
  // Component
  const BiskitIcon = ({ icon }) => {
    return <div className="biskit-icon">{icon}</div>;
  };

  // Contract Address & ABI
  const contractAddress = "0x441E9B7CBD651A4C3469A5B52C87D6D7141532e0";
  const contractABI = abi.abi;

  const [index, setIndex] = useState(0);
  const [memos, setMemos] = useState([]);
  const [cards, setCards] = useState([]);

  const handleNext = () => {
    if (index > cards.length) {
      setIndex(0);
    }
    setIndex((index + 1) % cards.length);
  };

  const handlePrev = () => {
    if (index === 0) {
      setIndex(cards.length - 1);
    } else {
      setIndex((index - 1) % cards.length);
    }
  };

  const getMemos = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const buyABiskit = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("fetching memos from the blockchain..");
        const memos = await buyABiskit.getMemos();
        console.log(memos);
        console.log("fetched!");
        setMemos(memos);
        console.log("Making Cards......");
        let cards = [];
        for (const memo in memos) {
          const arr = memos[memo];
          cards.push(
            <SliderCard
              name={arr.name}
              idea={arr.message}
              time={arr.timestamp.toString()}
            />
          );
        }
        setCards(cards);
      } else {
        console.log("Metamask is not connected");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let buyABiskit;

    getMemos();

    // Create an event handler function for when someone sends
    // us a new memo.
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
          <Link href="/about">
            <a>
              <BiskitIcon icon={<FaInfo />} />
            </a>
          </Link>
        </div>
        <div class="justify-center items-center flex absolute right-0 top-0 h-20 w-20 bg-gray-900 m-8 bg-opacity-75 rounded-lg">
          <Link href="/">
            <a>
              <BiskitIcon icon={<FaCookieBite />} />
            </a>
          </Link>
        </div>

        <h1 class="text-gray-100 flex justify-center items-center m-10 text-large font-gorilla ">
          Idea Tank
        </h1>
        <div class="max-w-screen-xl mx-auto px-4">
          <div class="-mx-4 flex flex-wrap justify-center items-center">
            <div onClick={handlePrev} class="h-full flex flex-col p-4 xl:w-1/4">
              <BiskitIcon icon={<FaArrowLeft />} />
            </div>
            <div class=" flex flex-col p-4 xl:w-2/4">{cards[index]}</div>
            <div onClick={handleNext} class="h-full flex flex-col p-4 xl:w-1/4">
              <BiskitIcon icon={<FaArrowRight />} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
