"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

interface ClubTitleProps {
  clubId: string;
}
interface ClubData {
  thumbnail: string | null | undefined;
  title: string | null | undefined;
}

const ClubTitle = ({ clubId }: ClubTitleProps) => {
  const [clubData, setClubData] = useState<ClubData>();
  const supabase = createClient();

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const { data, error } = await supabase.from("Clubs").select("*").eq("id", clubId).single();
        const clubsData = { thumbnail: data?.thumbnail, title: data?.title };
        setClubData(clubsData);
      } catch (error) {}
    };

    fetchClubData();
  }, [clubId]);

  if (!clubData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex gap-x-2">
      <div className="relative w-[50px] h-[50px] items-center">
        {clubData.thumbnail && (
          <Image src={clubData.thumbnail} alt="Thumbnail" layout="fill" className="rounded-lg bg-cover" />
        )}
      </div>
      <div className="ml-4 flex items-center font-bold text-2xl">{clubData.title} 모임</div>
    </div>
  );
};

export default ClubTitle;
