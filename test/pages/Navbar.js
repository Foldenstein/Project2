import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
    return (
        <nav className='nav'>
            <Link href='/' className='site-title'>
                Vote of Food
            </Link>
            <ul>
                <CustomLink href='/'>Home</CustomLink>
                <CustomLink href='/voting'>Voting Platform</CustomLink>
                <CustomLink href='/user'>User</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink({ href, children, ...props }) {
    const router = useRouter();
    // Check if the current URL matches the link's destination
    const isActive = router.pathname === href;

    return (
        <li className={isActive ? 'active' : ''}>
            <Link href={href} {...props}>
                {children}
            </Link>
        </li>
    )
}