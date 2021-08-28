import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";

const MenuItem: React.FC<LinkProps> = ({ children, href }) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <button
        className={`menu--button ${
          router.pathname === href && "menu--button-active"
        }`}
      >
        {children}
      </button>
    </Link>
  );
};

export const Menu: React.FC = () => {
  return (
    <div className="menu">
      <MenuItem href="/">Ratings</MenuItem>
      <MenuItem href="/matches">Jogos</MenuItem>
      <MenuItem href="/about">Sobre</MenuItem>
    </div>
  );
};
