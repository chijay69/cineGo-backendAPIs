export enum Status {
    PAID = "PAID",
    PENDING = "PENDING",
    UNPAID = "UNPAID"
}

export function validateStatus(status: string): Status {
    if (Object.values(Status).includes(status as Status)) {
        return status as Status;
    } else {
        throw new Error(`Invalid status: ${status}`);
    }
}