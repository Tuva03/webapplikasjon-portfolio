import Projects from "./components/Project";

function App() {
  const student = "Halgeir Geirson";
  const degree = "Bachelor IT";
  const points = 180;
  const experienceOne = "Figma UI for customer X";
  const experienceTwo = "Website for customer Y";
  const email = "student@hiof.no";

  return (
    <div>
      <Header student={student} degree={degree} points={points} />
      <Experiences
        experienceOne={experienceOne}
        experienceTwo={experienceTwo}
      />
      <Contact email={email} />
      <Projects />
    </div>
  );
}

type HeaderProps = {
  student: string;
  degree: string;
  points: number;
};

function Header(props: HeaderProps) {
  return (
    <header>
      <p>
        Studenten {props.student} studerer {props.degree} og har for øyeblikket{" "}
        {props.points} studiepoeng!
      </p>
    </header>
  );
}
/*
type ExperiencesProps = {
  experienceOne: string;
  experienceTwo: string;
};


function Experiences(props: ExperiencesProps) {
  return (
    <section>
      <p>
        Erfaringer: {props.experienceOne} og {props.experienceTwo}
      </p>
    </section>
  );
}
*/

type ExperienceProp = {
  description: string;
};

function Experience(props: ExperienceProp) {
  return <p>Beskrivelse: {props.description}</p>;
}

function Experiences({ experienceOne, experienceTwo }) {
  return (
    <div>
      <Experience description={experienceOne} />
      <Experience description={experienceTwo} />
    </div>
  );
}

type ContactProps = {
  email: string;
};

function Contact(props: ContactProps) {
  return (
    <section>
      <p>Kontaktinformasjon: {props.email}</p>
    </section>
  );
}

export default App;
