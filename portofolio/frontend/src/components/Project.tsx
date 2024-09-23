import type { PropsWithChildren } from "react";
import CreateProject from "./CreateProject";
import { useEffect, useState } from "react";
import { ProjectProps } from "./Types";
import Total from "./Total";
import { ofetch } from "ofetch";

function Project(props: Readonly<PropsWithChildren<ProjectProps>>) {
  const { children, prosjekt_navn, beskrivelse, kategorier, repo_link } = props;
  return (
    <>
      {children}
      <h3>{prosjekt_navn}</h3>
      <p>Beskrivelse: {beskrivelse}</p>
      <p>Kategorier: {kategorier.join(", ")}</p>
      <a>Link: {repo_link}</a>
    </>
  );
}

type ProjectsProps = {
  projects: ProjectProps[];
};

export default function Projects(props: Readonly<ProjectsProps>) {
  const [projects, setProjects] = useState<ProjectProps[]>(
    props.projects ?? []
  );

  const onAddProject = (project: {
    title: string;
    description: string;
    categories: string;
    repo_link: string;
  }) => {
    setProjects((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        prosjekt_navn: project.title,
        beskrivelse: project.description,
        kategorier: project.categories,
        repo_link: project.repo_link,
      },
    ]);
  };

  const removeProject = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  const initializeData = async () => {
    console.log("Fetching data...");
    try {
      const fetchedProjects = await ofetch("http://localhost:3999/projects");
      console.log("Data fetched");
      setProjects(fetchedProjects.prosjekter);
      console.log("Data initialized");
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  return (
    <>
      <section id="prosjekter">
        {projects.length === 0 ? (
          <p>Du har ingen prosjekter</p>
        ) : (
          projects.map((project) => (
            <article key={project.id}>
              {" "}
              <Project
                id={project.id}
                prosjekt_navn={project.prosjekt_navn}
                beskrivelse={project.beskrivelse}
                kategorier={project.kategorier}
                repo_link={project.repo_link}
              />
              <button
                id="fjern_prosjekt"
                onClick={() => removeProject(project.id)}
                type="button"
              >
                Fjern prosjekt
              </button>
            </article>
          ))
        )}
      </section>
      <Total total={projects.length} />
      <CreateProject onAddProject={onAddProject} />
    </>
  );
}
