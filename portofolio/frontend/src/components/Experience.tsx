import { ExperienceProps } from "./Types";

function Experience({ name }: { name: string }) {
  return <p>{name}</p>;
}

export default function Experiences(props: Readonly<ExperienceProps>) {
  const { experiences = [] } = props;
  return (
    <section id="erfaringer">
      <h3>Erfaringer:</h3>
      <ul>
        {experiences.length === 0 ? (
          <p>Du har ingen erfaringer</p>
        ) : (
          experiences.map((experience) => (
            <li key={experience.name}>{experience.name}</li>
          ))
        )}
      </ul>
    </section>
  );
}
