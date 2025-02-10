'use client'
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { FaSearch, FaLinkedinIn, FaGithub, FaTimes } from "react-icons/fa";
import { Button } from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { PropagateLoader } from "react-spinners";

const Home = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFirstLoad(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [username]);

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
          public_repos: data.public_repos,
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
    setLoading(true);

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      const data = await res.json();

      if (data.message === 'Not Found') {
        setError("User not found!");
        setLoading(false);
        return;
      }

      setTimeout(() => {
        setUserData({
          avatar_url: data.avatar_url,
          name: data.name,
          login: data.login,
          bio: data.bio,
          followers: data.followers,
          following: data.following,
          public_repos: data.public_repos,
          socialLinks: {
            twitter: data.twitter_username ? `https://twitter.com/${data.twitter_username}` : null,
            linkedin: "https://www.linkedin.com/in/your-linkedin-profile",
            github: data.html_url,
          },
        });
        setLoading(false);
      }, 2000);

    } catch (error) {
      console.error("Error fetching user:", error);
      setError("An error occurred while fetching user data.");
      setLoading(false);
    }
  };

  return (
    <>
      {firstLoad ? (
        <div className="flex justify-center items-center h-[90vh] bg-[#141C2F]">
          <Image
            src="/Logo.jpg"
            alt="Logo"
            width={400}
            height={0}
            className="rounded-full mx-auto object-cover"
          />
        </div>
      ) : (
        <div className="lg:w-[70%] md:w-[80%] w-[95%] mx-auto">
          <Header />
          <div className="bg-[#1F2A48] w-full flex items-center rounded-[5px] gap-1 md:gap-3 pl-2 md:pl-6 pr-2 cursor-pointer">
            <FaSearch size={30} color="#0079FE" />
            <input
              type="search"
              placeholder="Search Github Username...."
              className="w-full text-[#C2C6CE] text-[12px] md:text-base font-mono px-2 md:px-6 py-5 bg-[#1F2A48] outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button style="px-[20px] py-[10px] font-mono text-white font-medium" onClick={handleSearch}>
              Search
            </Button>
          </div>

          {error && (
            <div className="bg-[#ff00006b] w-full h-[50px] flex justify-between items-center rounded-[4px] px-[16px] mt-[100px]">
              <p className="text-white font-mono">{error}</p>
              <FaTimes className="text-white cursor-pointer" onClick={() => setError(null)} />
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center mt-[200px]">
              <PropagateLoader color="#0079FE" />
            </div>
          )}

          {!loading && userData && !error && (
            <div className="mt-8 bg-[#1F2A48] rounded-[12px] w-full py-[20px] px-4 md:p-[40px]">
              <div>
                <div className="md:flex items-start gap-6">
                  <Image
                    src={userData.avatar_url}
                    alt={userData.login}
                    width={128}
                    height={128}
                    className="rounded-full mx-auto md:mx-0"
                  />
                  <div className="text-center md:text-start">
                    <h2 className="text-[24px] font-bold font-mono pb-0 mb-0 text-[#C2C6CE]">{userData.name}</h2>
                    <p className="text-[14px] pt-0 font-mono font-medium text-[#8798bb]">@{userData.login}</p>
                    <p className="text-[14px] font-mono font-medium text-[#8798bb] pt-[30px]">{userData.bio}</p>
                  </div>
                </div>
                <div className="mt-10 mb-6 lg:mb-0 flex justify-center md:justify-start">
                  <Link href={`/user/${userData.login}`} className="bg-[#0079FE] rounded-[4px] px-[20px] py-[12px] text-white font-mono font-medium text-[14px]">
                    View full profile
                  </Link>
                </div>

                <div className="bg-[#141C2F] w-[300px] font-mono mx-auto p-[30px] rounded-[12px] flex justify-between text-white items-center">
                  <div>
                    <h1 className="text-sm">Repo</h1>
                    <strong className="font-bold text-[20px] pl-[2px]">{userData.public_repos}</strong>
                  </div>
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
      )}
    </>
  );
};

export default Home;
