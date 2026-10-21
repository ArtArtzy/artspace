import RegisterScreen from "./RegisterScreen";
import { authContext } from "../login/auth-context";

export default async function RegisterPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <RegisterScreen {...authContext(await searchParams)} />;
}
