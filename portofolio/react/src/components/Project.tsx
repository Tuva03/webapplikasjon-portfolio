import type { PropsWithChildren } from "react";

type ProjectProps = {
  prosjekt_navn: string;
  beskrivelse: string;
  repo_link: string;
};

function Project(props: Readonly<PropsWithChildren<ProjectProps>>) {
  const { children, prosjekt_navn, beskrivelse, repo_link } = props;
  return (
    <>
      {children}
      <article>
        <h3>{prosjekt_navn}</h3>
        <p>Beskrivelse: {beskrivelse}</p>
        <a>Link: {repo_link}</a>
      </article>
    </>
  );
}

type ProjectsProps = {
  projects: ProjectProps[];
};

export default function Projects(props: Readonly<ProjectsProps>) {
  // Send props videre og legg til riktig props under på Project
  const { projects = [] } = props;
  return (
    <section>
      {projects.map((project) => (
        <Project
          prosjekt_navn={project.prosjekt_navn}
          beskrivelse={project.beskrivelse}
          repo_link={project.repo_link}
        />
      ))}
    </section>
  );
}
