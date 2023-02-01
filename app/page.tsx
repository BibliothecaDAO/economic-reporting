"use client"

import { useMemo, useState } from "react"
import Head from "next/head"
import { useEternum } from "@/src/hooks/useEternum"
import { QueryName, QueryOptions, RealmEvent } from "@/src/types"
import { formatEther } from "@ethersproject/units"

import { Layout } from "@/components/layout"
import { Table } from "@/components/table/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function IndexPage() {
  const [tableData, setTableData] = useState<any>([])

  const {
    queryFunction,
    queryName,
    setQueryName,
    options,
    useVariables,
    variables,
  } = useEternum()

  const { data, loading } = queryFunction(
    queryName,
    useVariables(variables, options)
  )

  useMemo(() => {
    let tableData: any = []

    if (loading) return

    if (queryName === QueryName.useGetEconomyTotalsQuery) {
      tableData = data?.economyResourceMintedTotals.map((resource, index) => {
        return {
          resource: resource.resourceName,
          minted: +formatEther(resource.amount).toLocaleString(),
          burnt: +formatEther(
            data.economyResourceBurnedTotals[index].amount
          ).toLocaleString(),
        }
      })
    } else if (queryName === QueryName.useGetRealmHistoryQuery) {
      tableData = data?.getRealmHistory
      console.log("getRealmHistory", data?.getRealmHistory)
    }

    setTableData(tableData)
  }, [data])

  return (
    <Layout>
      <Head>
        <title>Economic Reporting</title>
        <meta name="description" content="Bibliotheca DAO Economics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container grid items-center gap-6 pt-6 pb-8 overflow-x-scroll md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Economic Reporting
          </h1>

          <div className="mb-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <span className="font-bold">Queries</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="flex flex-col space-y-2"
                align="start"
              >
                {Object.values(QueryName).map((queryName: any) => (
                  <Button
                    onClick={() => setQueryName(queryName as QueryName)}
                    variant="default"
                    key={queryName}
                  >
                    {queryName}
                  </Button>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {loading && <div>Loading...</div>}

          {tableData.length && <Table data={tableData} />}
        </div>
      </section>
    </Layout>
  )
}
