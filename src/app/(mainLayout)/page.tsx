import Banner from "@/components/modules/home/Banner";
import Cooking from "@/components/modules/home/Cooking";
import CustomerFeedback from "@/components/modules/home/CustomerFeedback";
import Popular from "@/components/modules/home/Popular";

export default async function HomePage() {
  return (
    <div>
      <Banner />
      <CustomerFeedback />
      <Popular />
      <Cooking />
    </div>
  );
}
