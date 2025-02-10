export const Footer = () => {

    return (
        <footer className="md:flex flex-col-reverse justify-between text-gray-400 font-mono text-sm mt-[60px] md:mt-[100px]">
            <span className="text-center md:text-start">© {new Date().getFullYear()} GitSpy. All rights reserved.</span>
        <p className="text-center md:text-end pt-2">Developed by <a href="https://david-mgbede.vercel.app" className="text-blue-400">David Mgbede</a></p>
        </footer>
    );
};
