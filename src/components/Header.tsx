import Link from "next/link";

export const Header = () => {

    const nav = [
        { title: "Home", link: "/" },
        { title: "About", link: "/about" }
    ];

    return (
        <div className="flex justify-between items-center pb-[30px]">
            <h2 className="font-mono text-[#C2C6CE] font-bold text-[20px]">GitSpy</h2>
            <ul className="flex items-center gap-[40px] text-[#C2C6CE] text-base font-mono">
                {nav.map((item, index) => (
                    <li key={index}>
                        <Link href={item.link}>{item.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
