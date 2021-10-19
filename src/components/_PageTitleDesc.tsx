import React from "react";
import Head from "next/head";

interface PageTitleDescProps {
  title: string;
  description: string;
}

export const PageTitleDesc: React.FC<PageTitleDescProps> = ({
  title,
  description,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
};
