import Projects from "./components/Project";
import type { ProjectProps } from "./components/Project";
import Header from "./components/Header";
import Experiences from "./components/Experience";
import Contact from "./components/Contact";
import * as prosjekter from "./components/prosjektdata.json";
import CreateProject from "./components/CreateProject";
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
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addProject = async (
    { id }: { id: string },
    { title }: { title: string },
    { description }: { description: string },
    { repolink }: { repolink: string }
  ) => {
    try {
      const response = await fetch("http://localhost:3999/json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: `${crypto.randomUUID()}`,
          title,
          description,
          repolink,
        }),
      });
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      setError("noe gikk galt");
    }
  };

  return (
    <main>
      <Header
        name={student.name}
        degree={student.degree}
        points={student.points}
      />
      <Experiences experiences={student.experiences} />
      <Contact email={student.email} />
      <Projects projects={prosjektlise} />
      <CreateProject />
    </main>
  );
}

export default App;
