import { getDictionary } from "../../get-dictionary";
import { Locale } from "../../i18n-config";
import AboutMe from "./_components/aboutMe";
// import Awards from "./_components/award";s
import Book from "./_components/book";
import Brands from "./_components/brands";
import Filmography from "./_components/filmography";
import Hero from "./_components/hero";
import Services from "./_components/services";

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
      {/* <Awards /> */}
      <Filmography />
      <Book />
      <Services />
      <Brands />
    </div>
  );
}
