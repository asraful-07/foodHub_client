import { redirect } from "next/navigation";

export default function ProviderDashboard() {
  return redirect("/dashboard/profile");
}
