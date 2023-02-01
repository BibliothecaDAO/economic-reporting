import {
  RealmHistoryWhereInput,
  useGetEconomyTotalsQuery,
  useGetRealmHistoryQuery,
  useGetRealmQuery,
} from "@/src/generated/graphql"

export enum QueryName {
  useGetEconomyTotalsQuery = "useGetEconomyTotalsQuery",
  useGetRealmHistoryQuery = "useGetRealmHistoryQuery",
}

export type QueryFunction<T> = (options: T) => any

export const queryFunctions: { [K in QueryName]: QueryFunction<any> } = {
  [QueryName.useGetEconomyTotalsQuery]: useGetEconomyTotalsQuery,
  [QueryName.useGetRealmHistoryQuery]:
    useGetRealmHistoryQuery as QueryFunction<RealmHistoryWhereInput>,
}

export type QueryOptions = {
  [K in keyof typeof queryFunctions]: Parameters<(typeof queryFunctions)[K]>[0]
}

export enum RealmEvent {
  realmCombatAttack = "realm_combat_attack",
  realmCombatDefend = "realm_combat_defend",
  realmBuildingBuilt = "realm_building_built",
  realmTransfer = "realm_transfer",
  realmSettle = "realm_settle",
  realmUnsettle = "realm_unsettle",
  armyTravel = "army_travel",
  foodHarvest = "food_harvest",
  foodCreated = "food_created",
  armyBuild = "army_built",
}
