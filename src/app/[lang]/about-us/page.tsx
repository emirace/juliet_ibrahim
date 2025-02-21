import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Hero from "./_component/hero";
import AboutMe from "./_component/aboutMe";
import AboutMe2 from "./_component/aboutMe2";
import AboutMe3 from "./_component/aboutMe3";

export default async function IndexPage(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);
  console.log(dictionary);

  return (
    <div>
      <Hero />
      <AboutMe />
      <AboutMe2 />
      <AboutMe3 />
    </div>
  );
}
