// CustomLink.tsx
import React from "react";
import { Link, LinkProps } from "react-router-dom";

interface TokenType {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  userLocation: string;
  // Add other properties if needed
}

interface CustomLinkProps extends LinkProps {
  token: TokenType | null; // Replace TokenType with the actual type of your token
}

const CustomLink: React.FC<CustomLinkProps> = ({ token, ...props }) => {
  return <Link {...props} />;
};

export default CustomLink;