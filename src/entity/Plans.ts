export enum Plans {
    BASIC = "BASIC",
    STANDARD = "STANDARD",
    PREMIUM = "PREMIUM"
}

export function validatePlan(plan: string): Plans {
    const pl = plan.toUpperCase();
    if (Object.values(Plans).includes(pl as Plans)) {
        return pl as Plans;
    } else {
        throw new Error(`Invalid plan: ${plan}`);
    }
}
