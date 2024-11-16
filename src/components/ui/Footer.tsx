export default function Footer() {
    return (
        <footer className="w-full bg-gray-800 text-base">
            <div className=" w-full pt-[10px] pb-[10px] pl-[20px] pr-[20px]">
                VietNam
            </div>
            <div className="flex w-full bg-transparent lg:justify-between justify-center pt-[10px] pb-[10px] pl-[20px] pr-[20px] border-t border-t-gray-700">
                <div className="space-x-4 items-center hidden lg:flex">
                <p>About</p>
                <p>Advertising</p>
                <p>Business</p>
                <p>How Search works</p>
                </div>
                <div className="flex space-x-12 lg:space-x-4 items-center text-sm lg:text-base">
                <p>Privacy</p>
                <p>Terms</p>
                <p>Settings</p>
                </div>
            </div>
        </footer>
    );
}