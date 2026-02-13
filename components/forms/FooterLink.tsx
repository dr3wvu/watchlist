import React from "react";
import Link from "next/link";

const FooterLink = ({ text, linkText, href }: any) => {
  return (
    <div className="text-center pt-4">
      <div className="text-sm text-gray-500 flex items-center justify-center gap-2">
        {text}
        <Link href={href} className="footer-link">
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default FooterLink;
