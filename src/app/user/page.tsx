"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const UserProfile = () => {
  const { username } = useParams(); // ✅ Get username from URL
  console.log("Username from URL:", username);
  const [userData, setUserData] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

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
          location: data.location,
          company: data.company,
          blog: data.blog,
          twitter: data.twitter_username ? `https://twitter.com/${data.twitter_username}` : null,
          github: data.html_url,
          linkedin: `https://linkedin.com/in/${data.login}`,
        });
  
        // Fetch repositories
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
  

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!userData) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="w-[70%] mx-auto text-white">
      <div className="bg-[#1F2A48] rounded-[12px] w-full p-[40px]">
        <div className="flex items-start gap-6">
          <Image
            src={userData.avatar_url}
            alt={userData.login}
            width={150}
            height={150}
            className="rounded-full"
          />
          <div>
            <h2 className="text-[28px] font-bold font-mono pb-0 mb-0">{userData.name}</h2>
            <p className="text-[16px] font-mono font-medium text-[#8798bb]">@{userData.login}</p>
            <p className="text-[14px] font-mono font-medium text-[#8798bb] pt-[20px]">{userData.bio}</p>

            {userData.location && <p className="text-sm mt-2">📍 {userData.location}</p>}
            {userData.company && <p className="text-sm mt-2">🏢 {userData.company}</p>}
            {userData.blog && (
              <p className="text-sm mt-2">
                🔗 <a href={userData.blog} target="_blank" rel="noopener noreferrer" className="text-blue-400">{userData.blog}</a>
              </p>
            )}

            <div className="mt-6 flex gap-6">
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

        <div className="bg-[#141C2F] w-[300px] mx-auto p-[30px] rounded-[12px] flex justify-between mt-8">
          <div>
            <h1 className="text-sm">Followers</h1>
            <strong className="font-bold text-[20px]">{userData.followers}</strong>
          </div>
          <div>
            <h1 className="text-sm">Following</h1>
            <strong className="font-bold text-[20px]">{userData.following}</strong>
          </div>
        </div>

        <h2 className="text-[20px] font-bold mt-10">Recent Repositories</h2>
        <div className="mt-4 space-y-4">
          {repos.length > 0 ? (
            repos.map((repo) => (
              <div key={repo.id} className="bg-[#141C2F] p-4 rounded-lg">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-lg font-semibold">
                  {repo.name}
                </a>
                <p className="text-gray-400 text-sm mt-1">{repo.description || "No description provided"}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No repositories found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
