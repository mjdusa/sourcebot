
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const planLabels = {
    oss: "OSS",
    "cloud:team": "Team",
    "self-hosted:enterprise": "Enterprise (Self-Hosted)",
} as const;
export type Plan = keyof typeof planLabels;


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const entitlements = [
    "search-contexts",
    "billing"
] as const;
export type Entitlement = (typeof entitlements)[number];

export const entitlementsByPlan: Record<Plan, Entitlement[]> = {
    oss: [],
    "cloud:team": ["billing"],
    "self-hosted:enterprise": ["search-contexts"],
} as const;
