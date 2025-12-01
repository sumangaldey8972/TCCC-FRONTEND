"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push("/approvals")
  }, [])

  return (
    <div className="min-h-screen">
    </div>
  );
}