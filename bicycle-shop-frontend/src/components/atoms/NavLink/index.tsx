import Link from 'next/link';
import Text from '../Text';

interface NavLinkProps {
  active: boolean;
  to: string;
  title: string;
}
const NavLink: React.FC<NavLinkProps> = ({ active, to, title }) => {
  return (
    <Link href={to}>
      <Text variant={active ? 'red' : 'white'} className="font-bold">
        {title}
      </Text>
    </Link>
  );
};

export default NavLink;
