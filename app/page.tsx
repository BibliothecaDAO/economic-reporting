"use client"

import Head from "next/head"
import Link from "next/link"
import {
  useGetEconomyTotalsQuery,
  useGetRealmHistoryQuery,
  useGetRealmQuery,
} from "@/src/generated/graphql"
import { formatEther } from "@ethersproject/units"

import { siteConfig } from "@/config/site"
import { Layout } from "@/components/layout"
import { Button, buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  const { data } = useGetEconomyTotalsQuery()

  // const { data } = useGetRealmHistoryQuery({
  //   pollInterval: 5000,
  //   variables: {
  //     take: 100,
  //   },
  // })

  function shortenHexString(hexString) {
    let start = hexString.substring(0, 4)
    let end = hexString.substring(hexString.length - 4)
    return start + "..." + end
  }

  console.log(data)

  return (
    <Layout>
      <Head>
        <title>Economic Reporting</title>
        <meta name="description" content="Bibliotheca DAO Economics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Economic Reporting
          </h1>
          <table className="w-full border">
            <thead>
              <tr>
                <th>Resource</th>
                {/* <th>Purchased</th> */}

                <th>Minted</th>
                <th>Burnt</th>
              </tr>
            </thead>
            <tbody>
              {data?.economyResourceMintedTotals.map((resource, index) => {
                return (
                  <tr className="p-2 border" key={index}>
                    <td className="p-1 border">{resource.resourceName}</td>
                    {/* <td className="p-1 border">
                      {
                        +formatEther(
                          data?.economyExchangeResourcePurchasedTotals[index]
                            .amount
                        ).toLocaleString()
                      }
                    </td> */}

                    <td className="p-1 border">
                      {
                        +formatEther(
                          data?.economyResourceMintedTotals[index].amount
                        ).toLocaleString()
                      }
                    </td>
                    <td className="p-1 border">
                      {
                        +formatEther(
                          data?.economyResourceBurnedTotals[index].amount
                        ).toLocaleString()
                      }
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  )
}
