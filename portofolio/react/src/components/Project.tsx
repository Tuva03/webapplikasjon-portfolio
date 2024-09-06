type ProjectProps = {
  title: string;
  description: string;
  repo_link: number;
};

function Project(props: ProjectProps) {
  return (
    <article>
      <h3>{props.title}</h3>
      <p>Beskrivelse:{props.description}</p>
      <a>{props.repo_link}</a>
    </article>
  );
}

export default function Projects(props: ProjectProps) {
  // Send props videre og legg til riktig props under på Project
  return (
    <>
      <Project
        title={props.title}
        description={props.description}
        repo_link={props.repo_link}
      />
      <Project
        title={props.title}
        description={props.description}
        repo_link={props.repo_link}
      />
      <Project
        title={props.title}
        description={props.description}
        repo_link={props.repo_link}
      />
      <Project
        title={props.title}
        description={props.description}
        repo_link={props.repo_link}
      />
    </>
  );
}
