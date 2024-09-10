import Projects from "./components/Project";
import * as prosjekter from "./components/prosjektdata.json";

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
    </main>
  );
}

type HeaderProps = {
  name: string;
  degree: string;
  points: number;
};

function Header(props: HeaderProps) {
  return (
    <header>
      <p>
        Studenten {props.name} studerer {props.degree} og har for øyeblikket{" "}
        {props.points} studiepoeng!
      </p>
    </header>
  );
}

type ExperienceProps = {
  experiences: {
    name: string;
  }[];
};

function Experience({ name }: { name: string }) {
  return <p>{name}</p>;
}

function Experiences(props: Readonly<ExperienceProps>) {
  const { experiences = [] } = props;
  return (
    <div>
      <p>Erfaringer:</p>
      {experiences.map((experience) => (
        <p key={experience.name}>
          <Experience name={experience.name}></Experience>
        </p>
      ))}
    </div>
  );
}

type ContactProps = {
  email: string;
};

function Contact(props: Readonly<ContactProps>) {
  const { email } = props;
  return (
    <section>
      <p>Kontaktinformasjon: {email}</p>
    </section>
  );
}

export default App;
