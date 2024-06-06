"use client";
import Calculator from "../components/Calculator";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-gradient-to-t from-[#E4E7EB] to-[#ECE9E3] flex-col items-center justify-center p-24">
      <Calculator />
    </main>
  );
}
