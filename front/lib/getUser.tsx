import { useEffect, useState } from "react";
import { getCurrentUser, User } from "./auth";

export const GetUser = (): User | null => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        let cancelled = false;
        (async () => {
            const current = await getCurrentUser();
            if (!cancelled) setUser(current);
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    return user;
}
