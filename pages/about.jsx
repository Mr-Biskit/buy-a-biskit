import { FaCookieBite, FaLightbulb, FaInfo, FaTwitter } from "react-icons/fa";
import React from "react";
import Link from "next/link";

export default function About() {
  const BiskitIcon = ({ icon }) => {
    return <div className="biskit-icon">{icon}</div>;
  };

  return (
    <div
      class="relative bg-[url('../images/background.jpeg')] bg-cover
       bg-center flex h-screen"
    >
      <title>Buy A Biskit!</title>
      <meta name="description" content="Tipping site" />
      <link rel="icon" href="/biskit.svg" />

      <main class="flex-auto">
        <div class="justify-center items-center flex absolute left-0 top-0 h-20 w-20 bg-gray-900 m-6 bg-opacity-75 rounded-lg">
          <Link href="/ideaTank">
            <a>
              <BiskitIcon onClick="" icon={<FaLightbulb />} />
            </a>
          </Link>
        </div>
        <div class="justify-center items-center flex absolute right-0 top-0 h-20 w-20 bg-gray-900 m-6 bg-opacity-75 rounded-lg">
          <Link href="/">
            <a>
              <BiskitIcon icon={<FaCookieBite />} />
            </a>
          </Link>
        </div>

        <h1 class="text-gray-100 flex justify-center items-center m-1 text-large font-gorilla ">
          About
        </h1>
        <div class="flex justify-center items-center h-auto">
          <div class="flex-1 px-6 py-10 rounded-lg shadow-lg bg-gray-900 m-2 bg-opacity-75">
            <h2 class="text-medium font-gorilla text-gray-50">
              What is Buy A Biskit?
            </h2>
            <p class="text-gray-50 font-sans">
              Buy A Biskit is a funding contract for the Biskit Bunch community
              projects. You can connect your wallet, leave your name and an idea
              for a a project that you would like to see in the Web3 space. You
              can either buy small biskit or large biskit. The contributions
              will be used for funding future Biskit Bunch projects
            </p>
            <h2 class="text-medium font-gorilla text-gray-50">Navigation</h2>
            <div class="-mx-4 flex flex-wrap">
              <div class="w-full flex flex-col p-2 sm:w-1/2 lg:w-1/3">
                <div class="flex-1 px-2 py-4 rounded-lg shadow-lg  bg-gray-900 bg-opacity-100">
                  <label class="flex justify-center items-center text-gray-100">
                    Idea Tank
                  </label>
                  <BiskitIcon icon={<FaLightbulb />} />
                </div>
              </div>
              <div class="w-full flex flex-col p-2 sm:w-1/2 lg:w-1/3">
                <div class="flex-1 px-2 py-4 rounded-lg shadow-lg  bg-gray-900 bg-opacity-100">
                  <label class="flex justify-center items-center text-gray-100">
                    About
                  </label>
                  <BiskitIcon icon={<FaInfo />} />
                </div>
              </div>
              <div class="w-full flex flex-col p-2 sm:w-1/2 lg:w-1/3">
                <div class="flex-1 px-2 py-4 rounded-lg shadow-lg  bg-gray-900 bg-opacity-100">
                  <label class="flex justify-center items-center text-gray-100">
                    Buy A Biskit
                  </label>
                  <BiskitIcon icon={<FaCookieBite />} />
                </div>
              </div>
            </div>
            <p class="text-center text-gray-50 font-sans">
              This project was created by Mr Biskit, for the Alchemy Road To
              Web3 week 2 challenge. If you like this project and want to follow
              Mr Biskit's Web3 journey follow on twitter!{" "}
              <a href="https://twitter.com/mr__biskit">
                <BiskitIcon icon={<FaTwitter />} />
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
