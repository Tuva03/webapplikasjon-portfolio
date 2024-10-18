import Projects from "./features/projects/components/Project";
import type { ProjectProps } from "./components/Types";
import Experiences from "./components/Experience";
import Contact from "./components/Contact";
import * as prosjekter from "./components/prosjektdata.json";
import { PropsWithChildren, useState } from "react";
import Layout from "./components/Layout";
import ProjectPage from "./features/projects/pages";

type AppProps = PropsWithChildren;

export default function App(props: AppProps) {
  const { children } = props;

  const student = {
    name: "Halgeir Geirson",
    degree: "Bachelor i IT",
    points: 180,
    email: "student@hiof.no",
    experiences: [
      { name: "Figma UI for customer X" },
      { name: "Website for customer Y" },
    ],
  };

  const prosjektlise = prosjekter.prosjekter;
  const [projects, setProjects] = useState<ProjectProps[]>(prosjektlise);

  return (
    <>
      <Layout>
        <Experiences experiences={student.experiences} />
        <Contact email={student.email} />
        <ProjectPage />
        {/* <Projects projects={projects} /> */}
      </Layout>
    </>
  );
}
