import { Section1 } from "@/components/Section1";
import { Section2 } from "@/components/Section2";
import { ScaleIntoSection } from "@/shared/ui/ScaleIntoSection";
import { TextGenerateOnScroll } from "@/shared/ui/TextGenerateOnScroll";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Section1 />
      <TextGenerateOnScroll text="I am a full-stack developer with experience in building high-performance web applications at all levels of development. My specialization covers both frontend and backend, which allows me to develop solutions from the user interface to the server logic. My goal is to provide clients with solutions that combine functionality, performance and adaptability." />
      <ScaleIntoSection
        className="220lvh py-[5vw]"
        outputRangeY={["0vw", "400vw"]}
        outputRangeX={["0%", "-3260%"]}
      >
        <h1 className="text-center text-[6vw] font-extrabold leading-[5vw]">
          Let`s dive <br /> into works
        </h1>
      </ScaleIntoSection>
      <Section2 />
    </main>
  );
}
