import type { Metadata } from "next";
import "../css/globals.css";
import 'swiper/css';
import 'swiper/css/pagination';
import { ReduxProvider } from "@/redux/provider";
import { interFont } from "@/utils/font";
import { ProviderNextUI } from "@/lib/nextProvider";



export const metadata: Metadata = {
  title: "Administrasi katapang",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body suppressHydrationWarning={true} >
          <ProviderNextUI>
            <div className={` ${interFont.className} dark:bg-boxdark-2 dark:text-bodydark`}>
              {children}
            </div>
          </ProviderNextUI>
        </body>
      </html>
    </ReduxProvider>
  );
}
