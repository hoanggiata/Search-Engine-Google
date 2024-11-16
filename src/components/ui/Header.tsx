export default function Header(){
    return (
        <header className="flex w-full justify-between text-base p-5 text-gray-300 md:font-medium bg-[#1a1c1d]">
            <div className="flex space-x-4 items-center">
                <p>About</p>
                <p>Store</p>
            </div>
            <div className="flex space-x-4 items-center">
                <p>Gmail</p>
                <p>Images</p>
            </div>
        </header>
    );
}