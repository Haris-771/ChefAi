export default function Header(){
    return (
        <header className="flex items-center justify-center gap-2 bg-white h-20 shadow-md">
            <img src="/chef-logo.svg" alt="" className="w-9"/>
            <span className="text-2xl text-black font-medium">Chef Claude</span>
        </header>
    )
}