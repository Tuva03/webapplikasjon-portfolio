import Projects from "./components/Project";
import Header from "./components/Header";
import Experiences from "./components/Experience";
import Contact from "./components/Contact";
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

export default App;
