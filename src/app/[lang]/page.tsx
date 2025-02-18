import { getDictionary } from "../../get-dictionary";
import { Locale } from "../../i18n-config";
import AboutMe from "./components/aboutMe";
import Book from "./components/book";
import Brands from "./components/brands";
import Filmography from "./components/filmography";
import Hero from "./components/hero";
import Services from "./components/services";

export default async function IndexPage(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);
  console.log(dictionary);

  return (
    <div className="">
      <Hero />
      <AboutMe />
      <Filmography />
      <Book />
      <Services />
      <Brands />
    </div>
  );
}
