export const Footer = () => {

    return (
        <footer className="flex justify-between text-gray-400 font-mono text-sm mt-[100px]">
            © {new Date().getFullYear()} GitSpy. All rights reserved.
        <p>Developed by <a href="https://david-mgbede.vercel.app" className="text-blue-400">David Mgbede</a></p>
        </footer>
    );
};
