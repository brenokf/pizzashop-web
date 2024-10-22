import { Link, LinkProps, useLocation } from "react-router-dom";

export type NavLinkProps = LinkProps;
export function NavLink(props: NavLinkProps) {
  // TODO: Add activeClassName and activeStyle to the Link component
  // to make it more customizable.
  const { pathname } = useLocation();
  return (
    <Link
      data-current={pathname === props.to}
      {...props}
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
    />
  );
}
