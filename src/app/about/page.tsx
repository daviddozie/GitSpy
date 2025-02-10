import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function About() {

    const userFlow = [
        "Enter a GitHub username in the search bar.",
        "Click the Search button to retrieve user data.",
        "View user details, including their avatar, bio, repo count, and more.",
        `Click on the "${"view full profile"}" button to visit their GitHub profile.`
    ];

    return (
        <div className="lg:w-[70%] md:w-[80%] w-[90%] mx-auto">
            <Header />
            <p className="text-[#8798bb] text-[16px] font-medium font-mono mt-[40px] md:mt-[100px]">GitSpy is a simple and efficient GitHub user search tool that allows developers to quickly find GitHub profiles and access key user information such as repositories, followers, and bio details.</p>
            <h1 className="text-[#C2C6CE] font-momo font-bold text-[24px] pt-[50px] pb-[10px]">How it Works:</h1>
            <ul className="text-[#8798bb] font-medium md:text-base text-sm font-mono list-disc pl-3">
                {userFlow.map((item, index) => (
                    <li className="pb-2" key={index}>{item}</li>
                ))}
            </ul>
            <Footer />
        </div>
    )
}

export default About;