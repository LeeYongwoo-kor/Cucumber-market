import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface ProfileResponse {
  ok: boolean;
  profile: User;
}

export default function useUser(publicPage: readonly string[]) {
  const router = useRouter();
  const { data, error } = useSWR<ProfileResponse>("/api/users/me");
  useEffect(() => {
    if (data && !data.ok && !publicPage.includes(router.pathname)) {
      router.replace("/enter");
    }
  }, [data, publicPage, router]);
  return { user: data?.profile, isLoading: !data && !error };
}
