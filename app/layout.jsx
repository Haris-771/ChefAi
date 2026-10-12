import "./globals.css";

export const metadata = {
  title: "Chef AI",
  description: "Create a recipe from the ingredients you have on hand.",
  icons: {
    icon: "/chef-logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
