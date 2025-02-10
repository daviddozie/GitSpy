import { Header } from "@/components/Header";

function About() {
    return (
        <div className="lg:w-[70%] md:w-[80%] w-[95%]">
            <div className="mx-auto w-full">
                <Header />
            </div>
            <p>GitSpy is a simple and efficient GitHub user search tool that allows developers to quickly find GitHub profiles and access key user information such as repositories, followers, and bio details.</p>
        </div>
    )
}

export default About;