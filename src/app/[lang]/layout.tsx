import { i18n, type Locale } from "../../i18n-config";
import "./globals.css";

import { Poppins, Plus_Jakarta_Sans } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const plus_jakarta_sans = Plus_Jakarta_Sans({
  variable: "--font-plus",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "i18n within app router - Vercel Examples",
  description: "How to do i18n in Next.js 15 within app router",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Root(props: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;

  const { children } = props;

  return (
    <html lang={params.lang}>
      <body className={`${poppins.variable} ${plus_jakarta_sans.variable}`}>
        {children}
      </body>
    </html>
  );
}
