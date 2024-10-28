const { default: Link } = require("next/link");

const NavItem = ({ name, url, icon }) => {
    return (
        <Link href={url}>
            <div className="flex flex-col items-center px-5 py-6 hover:box-shadow-big">
                {icon}
                <p className="font-mono text-2xl text-white py-3">{name}</p>
            </div>
        </Link>
    );
};

module.exports = NavItem;
