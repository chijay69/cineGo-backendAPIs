export enum Plans {
    BASIC = "BASIC",
    STANDARD = "STANDARD",
    PREMIUM = "PREMIUM"
}

export function validatePlan(plan: string): Plans {
    if (Object.values(Plans).includes(plan as Plans)) {
        return plan as Plans;
    } else {
        throw new Error(`Invalid plan: ${plan}`);
    }
}
