'use client'
import { Header } from "@/components/Header";
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/Button";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

const Home = () => {

  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchDefaultUserData = async () => {
    try {
      setError(null);
      const res = await fetch('https://api.github.com/users/daviddozie');
      const data = await res.json();
      if (data) {
        setUserData({
          avatar_url: data.avatar_url,
          name: data.name,
          login: data.login,
          bio: data.bio,
          followers: data.followers,
          following: data.following,
          socialLinks: {
            twitter: data.twitter_username ? `https://twitter.com/${data.twitter_username}` : null,
            linkedin: "https://www.linkedin.com/in/your-linkedin-profile",
            github: data.html_url,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching GitHub profile:", error);
    }
  };

  useEffect(() => {
    fetchDefaultUserData();
  }, []);

  const handleSearch = async () => {
    if (!username.trim()) return;
    setError(null); 
    setUserData(null);

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      const data = await res.json();

      if (data.message === 'Not Found') {
        setError("User not found!"); // Set error message
        return;
      }

      setUserData({
        avatar_url: data.avatar_url,
        name: data.name,
        login: data.login,
        bio: data.bio,
        followers: data.followers,
        following: data.following,
        socialLinks: {
          twitter: data.twitter_username ? `https://twitter.com/${data.twitter_username}` : null,
          linkedin: "https://www.linkedin.com/in/your-linkedin-profile",
          github: data.html_url,
        },
      });

    } catch (error) {
      console.error("Error fetching user:", error);
      setError("An error occurred while fetching user data.");
    }
  };

  return (
    <div className="w-[70%] mx-auto">
      <Header />

      <div className="bg-[#1F2A48] w-full flex items-center rounded-[5px] gap-3 pl-6 pr-2 cursor-pointer">
        <FaSearch size={30} color="#0079FE" />
        <input
          type="search"
          placeholder="Search Github Username...."
          className="w-full text-[#C2C6CE] text-base font-mono px-6 py-5 bg-[#1F2A48] outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button style="px-[20px] py-[10px] font-mono text-white font-medium" onClick={handleSearch}>Search</Button>
      </div>

      {error && <div className="bg-[red] w-full h-[50px] flex items-center rounded-[4px] px-[16px] mt-[100px]">
        <p className="text-white font-mono ">{error}</p>
      </div>}

      {userData && !error && (
        <div className="mt-8 bg-[#1F2A48] rounded-[12px] w-full p-[40px]">
          <div>
            <div className="flex items-start gap-6">
              <Image
                src={userData.avatar_url}
                alt={userData.login}
                width={128}
                height={128}
                className="rounded-full"
              />
              <div>
                <h2 className="text-[24px] font-bold font-mono pb-0 mb-0 text-[#C2C6CE]">{userData.name}</h2>
                <p className="text-[14px] pt-0 font-mono font-medium text-[#8798bb]">@{userData.login}</p>
                <p className="text-[14px] font-mono font-medium text-[#8798bb] pt-[30px]">{userData.bio}</p>
              </div>
            </div>
            <div className="mt-10">
              <Link href="/user"className="bg-[#0079FE] rounded-[4px] px-[20px] py-[12px] text-white font-mono font-medium text-[14px]">
                View full profile
              </Link>
            </div>

            <div className="bg-[#141C2F] w-[300px] font-mono mx-auto p-[30px] rounded-[12px] flex justify-between text-white">
              <div>
                <h1 className="text-sm">Followers</h1>
                <strong className="font-bold text-[20px] pl-[30px]">{userData.followers}</strong>
              </div>
              <div>
                <h1 className="text-sm">Following</h1>
                <strong className="font-bold text-[20px] pl-[30px]">{userData.following}</strong>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-center gap-8">
                {userData.socialLinks.twitter && (
                  <Link href={userData.socialLinks.twitter} target="_blank" className="text-[#C2C6CE]">
                    <FaXTwitter />
                  </Link>
                )}
                {userData.socialLinks.linkedin && (
                  <Link href={userData.socialLinks.linkedin} target="_blank" className="text-[#C2C6CE]">
                    <FaLinkedinIn />
                  </Link>
                )}
                {userData.socialLinks.github && (
                  <Link href={userData.socialLinks.github} target="_blank" className="text-[#C2C6CE]">
                    <FaGithub />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
