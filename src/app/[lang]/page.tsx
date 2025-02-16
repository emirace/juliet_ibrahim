import { getDictionary } from "../../get-dictionary";
import { Locale } from "../../i18n-config";
import Hero from "./components/hero";
import Navbar from "./components/navbar";

export default async function IndexPage(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);

  return (
    <div className="">
      <Navbar dictionary={dictionary.counter} />
      <Hero />
      <Hero />
    </div>
  );
}
