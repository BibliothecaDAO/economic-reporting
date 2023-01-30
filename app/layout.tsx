"use client"

import { ApolloProvider, InMemoryCache, gql } from "@apollo/client"
import { Inter as FontSans } from "@next/font/google"
import { ThemeProvider } from "next-themes"
import ApolloClient from "src/apolloClient"

import "../styles/globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

type RootLayoutProps = {
  children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html>
      <head>
        <style jsx global>{`
				:root {
					--font-sans: ${fontSans.style.fontFamily};
				}
			}`}</style>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ApolloProvider client={ApolloClient}>{children}</ApolloProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
