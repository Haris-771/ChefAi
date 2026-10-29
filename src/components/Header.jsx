export default function Header(){
    return (
        <header className="flex items-center justify-center gap-2 bg-white h-15 md:h-18 shadow-md rounded-xl">
            <img src="/chef-logo.svg" alt="" className="w-8 h-8"/>
            <span className="text-xl md:text-2xl text-black font-medium">Chef AI</span>
        </header>
    )
}