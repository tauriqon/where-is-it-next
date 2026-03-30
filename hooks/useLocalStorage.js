"use client"

import { useEffect, useRef, useState } from "react"

export default function useLocalStorage(key, initialValue) {
  const initialValueRef = useRef(initialValue)

  const [value, setValue] = useState(initialValueRef.current)
  const [isHydrated, setIsHydrated] = useState(false)

  // 처음 로드 시 localStorage 읽기
  useEffect(() => {
    const saved = localStorage.getItem(key)

    if (saved !== null) {
      setValue(JSON.parse(saved))
    } else {
      setValue(initialValueRef.current)
    }

    setIsHydrated(true)
  }, [key])

  // 값 변경 시 저장
  useEffect(() => {
    if (!isHydrated) return

    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value, isHydrated])

  return [value, setValue, isHydrated]
}