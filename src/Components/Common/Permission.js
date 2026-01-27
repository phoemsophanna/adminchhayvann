import { useProfile } from "../Hooks/UserHooks";

export const useCan = (permission) => {
    const { userProfile } = useProfile();
    const role = sessionStorage.getItem("permissions") ? JSON.parse(sessionStorage.getItem("permissions")) : userProfile;
    return role.permission.includes(permission);
}

export const useCanMultiple = (permission) => {
    const { userProfile } = useProfile();
    const role = sessionStorage.getItem("permissions") ? JSON.parse(sessionStorage.getItem("permissions")) : userProfile;
    return role.permission.some((q) => permission?.includes(q));
}