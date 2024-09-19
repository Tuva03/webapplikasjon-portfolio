type ExperienceProps = {
  experiences: {
    name: string;
  }[];
};

function Experience({ name }: { name: string }) {
  return <p>{name}</p>;
}

export default function Experiences(props: Readonly<ExperienceProps>) {
  const { experiences = [] } = props;
  return (
    <div>
      <p>Erfaringer:</p>
      {experiences.length === 0 ? (
        <p>Du har ingen erfaringer</p>
      ) : (
        experiences.map((experience) => (
          <p key={experience.name}>
            <Experience name={experience.name}></Experience>
          </p>
        ))
      )}
    </div>
  );
}
