// Projects.tsx
import type { PropsWithChildren } from "react";
import CreateProject from "./CreateProject";
import { ProjectProps } from "../../../components/Types";
import Total from "./Total";
import useProjects from "../hooks/useProjects";

function Project(props: Readonly<PropsWithChildren<ProjectProps>>) {
  const { children, title, beskrivelse, categories, repo_link } = props;

  const categoriesList = Array.isArray(categories)
    ? categories.join(", ")
    : categories;

  return (
    <>
      {children}
      <h3>{title}</h3>
      <p>Beskrivelse: {beskrivelse}</p>
      <p>Kategorier: {categoriesList}</p>
      <a>Link: {repo_link}</a>
    </>
  );
}

type ProjectsProps = {
  projects: ProjectProps[];
};

export default function Projects(props: Readonly<ProjectsProps>) {
  const { projects, onAddProject, removeProject } = useProjects(props.projects);

  return (
    <>
      <section id="prosjekter" className="prosjekt_grid">
        {projects.length === 0 ? (
          <p>Du har ingen prosjekter</p>
        ) : (
          projects.map((project) => (
            <article key={project.id} className="prosjekt_grid-item">
              <Project
                id={project.id}
                title={project.title}
                beskrivelse={project.beskrivelse}
                categories={project.categories}
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
