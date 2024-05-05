import { Plan } from "./Plan"
import { Plans } from "./Plans"


export const userPlans: any[] = [
    {name: "basic", amount: 499.99, description: "Unlimited ad-free movies, TV shows, and mobile games\n Watch on 1 supported device at a time; Watch in HD\n Download on 1 supported device at a time", plan: Plans.BASIC},
    {name: "standard", amount: 799.99, description: "Unlimited ad-free movies, TV shows, and mobile games, TV shows, and mobile games\n Watch on 2 supported devices at a time\n Watch in Full HD\n Download on 2 supported devices at a time", plan: Plans.STANDARD},
    {name: "premuim", amount: 999.99, description: "Unlimited ad-free movies, TV shows, and mobile games, TV shows, and mobile games\n Watch on 4 supported devices at a time\n Watch in Ultra HD\n, Download on 6 supported devices at a time\n cineGo spatial audio", plan: Plans.PREMIUM}
]
