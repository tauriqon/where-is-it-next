"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function SupabaseTestPage() {
  const [message, setMessage] = useState("아직 테스트 안 함")

  async function handleTestConnection() {
    try {
      const supabase = createClient()

      if (!supabase) {
        setMessage("Supabase client 생성 실패")
        return
      }

      setMessage("Supabase client 생성 성공")
    } catch (error) {
      setMessage(`오류 발생: ${error.message}`)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Supabase 연결 테스트</h1>

      <button
        onClick={handleTestConnection}
        className="mt-4 rounded-xl bg-black px-4 py-2 text-white"
      >
        테스트
      </button>

      <p className="mt-4 text-sm text-gray-600">{message}</p>
    </div>
  )
}