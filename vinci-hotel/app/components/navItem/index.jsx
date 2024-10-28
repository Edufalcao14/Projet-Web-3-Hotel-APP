import Link from "next/link";

const NavItem = ({ name, url, icon }) => {
    return (
        <Link href={url}>
            <div className="flex flex-col items-center px-5 my-6 py-3 text-white hover:text-[#C18E50]">
                {icon}
                <p className="font-mono text-2xl  mt-3">{name}</p>
            </div>
        </Link>
    );
};

module.exports = NavItem;
