"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaCodeBranch, FaEye } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { PropagateLoader } from "react-spinners";
import { FaTimes } from "react-icons/fa";


const UserProfile = () => {
  const { username } = useParams();
  console.log("Username from URL:", username);
  const [userData, setUserData] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) {
      console.log("No username found");
      return;
    }

    console.log("Fetching data for:", username);

    const fetchUserProfile = async () => {
      try {
        setError(null);
        const res = await fetch(`https://api.github.com/users/${username}`);

        if (!res.ok) {
          console.log("GitHub API Error:", res.status);
          setError("User not found!");
          return;
        }

        const data = await res.json();
        console.log("GitHub API Response:", data);

        if (data.message === "Not Found") {
          setError("User not found!");
          return;
        }

        setUserData({
          avatar_url: data.avatar_url,
          name: data.name,
          login: data.login,
          bio: data.bio,
          followers: data.followers,
          following: data.following,
          public_repos: data.public_repos,
          location: data.location,
          company: data.company,
          blog: data.blog,
          twitter: data.twitter_username ? `https://twitter.com/${data.twitter_username}` : null,
          github: data.html_url,
          linkedin: `https://linkedin.com/in/${data.login}`,
        });

        const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
        const repoData = await repoRes.json();
        console.log("GitHub Repos:", repoData);
        setRepos(repoData);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Error fetching user data.");
      }
    };

    fetchUserProfile();
  }, [username]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PropagateLoader color="#0079FE" size={20} />
      </div>
    );
  }

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="lg:w-[70%] md:w-[80%] w-[95%] mx-auto text-white">
      <div className="bg-[#1F2A48] rounded-[12px] w-full py-[20px] px-[10px] md:p-[40px] my-[20px]">
        <Link href="/"><IoIosArrowBack size={30} /></Link>
        <div className="md:flex items-start gap-6 pt-4">
          <Image
            src={userData.avatar_url}
            alt={userData.login}
            width={150}
            height={150}
            className="rounded-full mx-auto md:mx-0"
          />
          <div className="text-center md:text-start">
            <h2 className="text-[28px] font-bold font-mono pb-0 mb-0">{userData.name}</h2>
            <p className="text-[16px] font-mono font-medium text-[#8798bb]">@{userData.login}</p>
            <p className="text-[14px] font-mono font-medium text-[#8798bb] py-[20px] ">{userData.bio}</p>

            {userData.location && <p className="text-sm mt-2 flex items-center gap-2 justify-center md:justify-start"><FaLocationDot className="text-gray-400" size={20} /> {userData.location}</p>}
            {userData.company && <p className="text-sm mt-2">🏢 {userData.company}</p>}
            {userData.blog && (
              <p className="text-sm mt-2">
                🔗 <a href={userData.blog} target="_blank" rel="noopener noreferrer" className="text-blue-400">{userData.blog}</a>
              </p>
            )}

            <div className="mt-6 flex justify-center md:justify-start gap-6">
              <Link href={userData.github} target="_blank">
                <FaGithub size={24} className="text-gray-400 hover:text-white" />
              </Link>
              {userData.twitter && (
                <Link href={userData.twitter} target="_blank">
                  <FaXTwitter size={24} className="text-gray-400 hover:text-white" />
                </Link>
              )}
              <Link href={userData.linkedin} target="_blank">
                <FaLinkedinIn size={24} className="text-gray-400 hover:text-white" />
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-[#141C2F] mt-5 w-[300px] font-mono mx-auto p-[30px] rounded-[12px] flex justify-between text-white items-center">
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

        <div className="flex justify-between mt-10 gap-6 items-center overflow-x-scroll md:overflow-hidden">
          <h2 className="md:text-[20px] text-[16px] font-bold whitespace-nowrap">Recent Repositories</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FaStar size={16} className="text-yellow-400" />
              <span className="text-sm">Starred</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCodeBranch size={16} className="text-gray-400" />
              <span className="text-sm">Forked</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEye size={16} className="text-gray-400" />
              <span className="text-sm">Watched</span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {repos.length > 0 ? (
            repos.map((repo) => (
              <div key={repo.id} className="bg-[#141C2F] p-4 rounded-lg">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-lg font-semibold">
                  {repo.name}
                </a>
                <p className="text-gray-400 text-sm mt-1">{repo.description || "No description provided"}</p>
                <div className="flex gap-4 text-sm mt-2">
                  <div className="flex items-center gap-2">
                    <FaStar size={16} className="text-yellow-400" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCodeBranch size={16} className="text-gray-400" />
                    <span>{repo.forks_count}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEye size={16} className="text-gray-400" />
                    <span>{repo.watchers_count}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-[#ff00006b] w-full h-[50px] flex justify-between items-center rounded-[4px] px-[16px] mt-[100px]">
              <p className="text-white font-mono">{error}</p>
              <FaTimes className="text-white cursor-pointer" onClick={() => setError(null)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
