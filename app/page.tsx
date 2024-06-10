"use client";
import Calculator from "../components/Calculator";
import { IoLogoGithub } from "react-icons/io";

export default function Home() {
  return (
    <main className="flex relative min-h-screen bg-gradient-to-t from-[#E4E7EB] to-[#ECE9E3] flex-col items-center justify-center p-24">
      <span className="absolute top-5 right-10 text-2xl">
        <a href="https://github.com/elinoza/tadaa-App" target="_blank">
          <IoLogoGithub />
        </a>
      </span>
      <Calculator />
    </main>
  );
}
