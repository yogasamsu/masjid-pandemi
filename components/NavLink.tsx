import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface NavLinkProps extends LinkProps {
    className?: string;
    activeClassName?: string;
    children: React.ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
    ({ className, activeClassName, children, ...props }, ref) => {
        const pathname = usePathname();
        const isActive = pathname === props.href;

        return (
            <Link
                ref={ref}
                className={cn(className, isActive && activeClassName)}
                {...props}
            >
                {children}
            </Link>
        );
    }
);

NavLink.displayName = "NavLink";

export default NavLink;
