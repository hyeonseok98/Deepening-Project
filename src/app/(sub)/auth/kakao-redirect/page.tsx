"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { useUserStore } from "@/store";

const KakaoRedirectPage = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const handleKakaoLogin = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("세션 가져오기 실패:", error.message);
        router.push("/auth/login");
        return;
      }

      const user = session?.user;
      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { data: userData, error: selectError } = await supabase
        .from("Users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (selectError && selectError.code !== "PGRST116") {
        console.error("유저 데이터 선택 실패:", selectError.message);
        return;
      }

      if (userData) {
        setUser({
          id: user.id,
          email: user.email ?? "",
          nickname: userData.nickname,
          profile_img: userData.profile_img,
        });
        console.log("user");
        router.push("/clubs");
        return;
      }

      router.push("/auth/socialNickname");
    };

    handleKakaoLogin();
  }, [router, setUser]);

  return <div className="font-semibold">로그인 중...</div>;
};

export default KakaoRedirectPage;
