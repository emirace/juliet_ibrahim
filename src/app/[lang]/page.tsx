import { getDictionary } from "../../get-dictionary";
import { Locale } from "../../i18n-config";
import AboutMe from "./components/aboutMe";
import Book from "./components/book";
import Brands from "./components/brands";
import Filmography from "./components/filmography";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Navbar from "./components/navbar";
import Services from "./components/services";

export default async function IndexPage(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);

  return (
    <div className="">
      <Navbar dictionary={dictionary.counter} />
      <Hero />
      <AboutMe />
      <Filmography />
      <Book />
      <Services />
      <Brands />
      <Footer />
    </div>
  );
}
