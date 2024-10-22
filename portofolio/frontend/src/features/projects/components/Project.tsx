// Projects.tsx
import type { PropsWithChildren } from "react";
import { Action, ProjectProps } from "../../../components/Types";
import Total from "./Total";
import { formatDistance } from "../helpers/format";
import ProjectForm from "./ProjectForm";

function Project(props: Readonly<PropsWithChildren<ProjectProps>>) {
  const { children, title, description, categories, repolink, publishedAt } =
    props;

  const formattedDate = new Date(publishedAt);

  const categoriesList = Array.isArray(categories)
    ? categories.join(", ")
    : categories;

  return (
    <>
      {children}
      <h3>{title}</h3>
      <p>Beskrivelse: {description}</p>
      <p>Kategorier: {categoriesList}</p>
      <p>
        Link: <a href={repolink}>{repolink}</a>
      </p>
      <p>Publisert {formatDistance(formattedDate, new Date())}</p>
    </>
  );
}

type ProjectsProps = {
  handleProjectMutation: (action: Action, project: Partial<Project>) => void;
  projects: ProjectProps[];
  addProject: (project: {
    title: string;
    description: string;
    categories: string | string[];
    repolink: string;
    publishedAt: Date;
  }) => void;
};

export default function Projects(props: Readonly<ProjectsProps>) {
  const { projects = [], handleProjectMutation, addProject, children } = props;

  //const addProject = async (title: string) => {
  //   handleProjectMutation("add", { title });
  // };

  const removeProject = (id: Id) => {
    handleProjectMutation("remove", { id });
  };

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
                description={project.description}
                categories={project.categories}
                repolink={project.repolink}
                publishedAt={project.publishedAt}
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
      <ProjectForm addProject={addProject} />
    </>
  );
}
