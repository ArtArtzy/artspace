import AuthScreen from "./AuthScreen";
import { authContext } from "./auth-context";

export default async function LoginPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  return <AuthScreen {...authContext(params)} registered={params.registered === "success"} />;
}
