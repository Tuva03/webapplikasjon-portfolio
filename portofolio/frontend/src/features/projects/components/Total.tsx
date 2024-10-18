import * as prosjekter from "../../../components/prosjektdata.json";

export default function Total({ total }: { total: number }) {
  const categoryCounts = {};
  const projects = prosjekter.prosjekter;

  projects.forEach((project) => {
    const { kategorier } = project;

    kategorier.forEach((category) => {
      if (category in categoryCounts) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });
  });

  return (
    <>
      <section id="total">
        <h3>Oversikt over alle kategorier</h3>
        <ul>
          {Object.keys(categoryCounts).map((category) => (
            <li key={category}>
              {category}: {categoryCounts[category]} prosjekter
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
