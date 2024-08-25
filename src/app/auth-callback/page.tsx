"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { trpc } from "../_trpc/client"

const AuthCallbackPage = async () => {
  const router = useRouter()

  const searchParams = useSearchParams()
  const origin = searchParams.get("origin")

  const query = trpc.authCallback.useQuery(undefined, {
    retry: true,
    retryDelay: 500
  })

  // Check for errors in the query result
  if (query.error) {
    const errData = query.error.data

    if (errData?.code === "UNAUTHORIZED") {
      router.push("/sign-in")
    } else {
      // Handle other types of errors
      console.error("An error occurred:", query.error)
    }
  }

  // Continue with other logic based on the query result
  if (query.data?.success) {
    router.push(origin ? `/${origin}` : "/dashboard")
  }

  return <div>AuthCallbackPage</div>
}

export default AuthCallbackPage
