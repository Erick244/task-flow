import LoginForm from "@/Components/Forms/Auth/LoginForm";
import { notExistTokenOrRedirectTo } from "@/functions/TokenFunctions";

export default function LoginPage() {
    notExistTokenOrRedirectTo("/main");

    return <LoginForm />;
}
