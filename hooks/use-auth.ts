"use client"

import useSWR, { mutate as globalMutate } from "swr"

export type User = {
  id: string
  email: string
  name?: string
}

const STORAGE_KEY = "auth_user"

function readUser(): User | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

function writeUser(user: User | null) {
  if (typeof window === "undefined") return
  if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  else localStorage.removeItem(STORAGE_KEY)
  // notify subscribers
  globalMutate("auth")
}

export function useAuth() {
  const { data: user } = useSWR<User | null>("auth", async () => readUser(), {
    fallbackData: readUser(),
  })

  async function login(email: string, _password: string) {
    const u: User = { id: crypto.randomUUID(), email }
    writeUser(u)
    return u
  }

  async function signup(email: string, _password: string, name?: string) {
    const u: User = { id: crypto.randomUUID(), email, name }
    writeUser(u)
    return u
  }

  function logout() {
    writeUser(null)
  }

  return { user: user ?? null, login, signup, logout }
}
