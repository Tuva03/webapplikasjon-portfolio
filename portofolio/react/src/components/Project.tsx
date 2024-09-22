import type { PropsWithChildren } from "react";
import CreateProject from "./CreateProject";
import { useState } from "react";
import { ProjectProps } from "./Types";
import Total from "./Total";

function Project(props: Readonly<PropsWithChildren<ProjectProps>>) {
  const { children, prosjekt_navn, beskrivelse, kategori, repo_link } = props;
  return (
    <>
      {children}
      <article>
        <h3>{prosjekt_navn}</h3>
        <p>Beskrivelse: {beskrivelse}</p>
        <p>Kategori: {kategori}</p>
        <a>Link: {repo_link}</a>
      </article>
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
    category: string;
    repo_link: string;
  }) => {
    setProjects((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        prosjekt_navn: project.title, // Mapping title to prosjekt_navn
        beskrivelse: project.description, // Mapping description to beskrivelse
        kategori: project.category, // Mapping
        repo_link: project.repo_link, // Keeping repo_link as is
      },
    ]);
  };

  const removeProject = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  return (
    <div>
      <section>
        {projects.length === 0 ? (
          <p>Du har ingen prosjekter</p>
        ) : (
          projects.map((project) => (
            <>
              <Project
                id={project.id}
                prosjekt_navn={project.prosjekt_navn}
                beskrivelse={project.beskrivelse}
                kategori={project.kategori}
                repo_link={project.repo_link}
              />
              <button onClick={() => removeProject(project.id)} type="button">
                Fjern prosjekt
              </button>
            </>
          ))
        )}
      </section>
      <section>
        <CreateProject onAddProject={onAddProject} />
      </section>
      <section>
        <Total total={projects.length} />
      </section>
    </div>
  );
}
