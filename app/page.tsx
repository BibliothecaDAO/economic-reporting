"use client"

import Head from "next/head"
import Link from "next/link"
import {
  useGetEconomyTotalsQuery,
  useGetRealmHistoryQuery,
  useGetRealmQuery,
} from "@/src/generated/graphql"
import { formatEther } from "@ethersproject/units"

import { Layout } from "@/components/layout"
import { Table } from "@/components/table/table"

export default function IndexPage() {
  const { data, loading } = useGetEconomyTotalsQuery({ pollInterval: 10000 })

  const tableData = data?.economyResourceMintedTotals.map((resource, index) => {
    return {
      resource: resource.resourceName,
      minted: +formatEther(resource.amount).toLocaleString(),
      burnt: +formatEther(
        data.economyResourceBurnedTotals[index].amount
      ).toLocaleString(),
    }
  })

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
          {loading && <div>Loading...</div>}
          {data && <Table data={tableData} />}
        </div>
      </section>
    </Layout>
  )
}
