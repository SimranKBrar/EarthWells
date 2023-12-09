import React from "react";
import { Link, LinkProps } from "react-router-dom";

interface TokenType {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  userLocation: string;
}

interface CustomLinkProps extends LinkProps {
  token: TokenType | null;
}

const CustomLink: React.FC<CustomLinkProps> = ({ token, ...props }) => {
  return <Link {...props} />;
};

export default CustomLink;