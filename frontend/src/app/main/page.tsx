import MainPage from "@/Components/Pages/MainPage";
import { existTokenOrRedirectTo } from "@/functions/TokenFunctions";

export default async function Main() {
    existTokenOrRedirectTo("/auth/signup");

    return <MainPage />;
}
