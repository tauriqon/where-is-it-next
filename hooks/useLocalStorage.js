"use client"

import { useEffect, useState } from "react"

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue)
  const [isHydrated, setIsHydrated] = useState(false)

  // 🔹 처음 로드 시 localStorage 읽기
  useEffect(() => {
    const saved = localStorage.getItem(key)

    if (saved) {
      setValue(JSON.parse(saved))
    } else {
      setValue(initialValue)
    }

    setIsHydrated(true)
  }, [key, initialValue])

  // 🔹 값 변경 시 저장
  useEffect(() => {
    if (!isHydrated) return

    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value, isHydrated])

  return [value, setValue, isHydrated]
}