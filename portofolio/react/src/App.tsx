import Projects from "./components/Project";
import type { ProjectProps } from "./components/Types";
import Header from "./components/Header";
import Experiences from "./components/Experience";
import Contact from "./components/Contact";
import * as prosjekter from "./components/prosjektdata.json";
import { useEffect, useState } from "react";

function App() {
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
  const [error, setError] = useState<string | null>(null);

  return (
    <main>
      <Header
        name={student.name}
        degree={student.degree}
        points={student.points}
      />
      <Experiences experiences={student.experiences} />
      <Contact email={student.email} />
      <Projects projects={projects} />
    </main>
  );
}

export default App;
