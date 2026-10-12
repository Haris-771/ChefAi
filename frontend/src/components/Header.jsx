export default function Header(){
    return (
        <header className="flex items-center justify-center gap-2 bg-white h-20 shadow-md">
            <img src="./src/assets/chef-logo.svg" alt="globe" className="w-9"/>
            <span className="text-2xl text-black font-medium">Chef Claude</span>
        </header>
    )
}