import {
  useGetEconomyTotalsQuery,
  useGetRealmHistoryQuery,
  useGetRealmQuery,
} from "@/src/generated/graphql"

export enum QueryName {
  useGetEconomyTotalsQuery = "useGetEconomyTotalsQuery",
  useGetRealmHistoryQuery = "useGetRealmHistoryQuery",
}

export enum QueryWhereInput {
  RealmHistoryWhereInput = "RealmHistoryWhereInput",
}

export const queryFunctions: { [K in QueryName]: (options: any) => any } = {
  [QueryName.useGetEconomyTotalsQuery]: useGetEconomyTotalsQuery,
  [QueryName.useGetRealmHistoryQuery]: useGetRealmHistoryQuery,
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
