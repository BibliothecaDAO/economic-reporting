import { useMemo, useState } from "react"

import { QueryName, RealmEvent, queryFunctions } from "../types"

export const useEternum = () => {
  const [queryName, setQueryName] = useState<QueryName>(
    QueryName.useGetEconomyTotalsQuery
  )
  const queryFunction = (queryName: QueryName, options?: any) => {
    return queryFunctions[queryName](options)
  }

  const options = useMemo(() => {
    return {
      pollInterval: 10000,
    }
  }, [queryName])

  const variables = useMemo(() => {
    return {
      filter: {},
      skip: 0,
      first: 10,
      take: 10,
    }
  }, [queryName])

  const useVariables = (variables = { filter: {} }, options = {}) => {
    return useMemo(() => {
      return {
        variables,
        options,
      }
    }, [variables, options])
  }

  return {
    queryFunction,
    queryName,
    setQueryName,
    options,
    useVariables,
    variables,
  }
}
