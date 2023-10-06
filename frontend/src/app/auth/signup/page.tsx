import SignUpForm from "@/Components/Forms/Auth/SignUpForm";
import { notExistTokenOrRedirectTo } from "@/functions/TokenFunctions";

export default function SignupPage() {
    notExistTokenOrRedirectTo("/main");

    return <SignUpForm />;
}
