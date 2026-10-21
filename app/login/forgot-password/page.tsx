import AuthScreen from "../AuthScreen";
import { authContext } from "../auth-context";

export default async function ForgotPasswordPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <AuthScreen {...authContext(await searchParams)} forgot />;
}
