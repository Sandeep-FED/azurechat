import React from "react";

export const CustomLink = ({ href, children }: any) => {
  const isExternal = href.startsWith("http");
  // Check if the link is external
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
};
