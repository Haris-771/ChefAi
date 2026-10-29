export default function Header(){
    return (
        <header className="flex items-center justify-center gap-2 bg-white h-16 md:h-18 shadow-md rounded-xl">
            <img src="/chef-logo.svg" alt="" className="w-8 h-8"/>
            <span className="text-2xl md:text-3xl tracking-tight text-black font-medium">Chef AI</span>
        </header>
    )
}