type HeaderProps = {
  name: string;
  degree: string;
  points: number;
};

export default function Header(props: HeaderProps) {
  return (
    <header>
      <p>
        Studenten {props.name} studerer {props.degree} og har for øyeblikket{" "}
        {props.points} studiepoeng!
      </p>
    </header>
  );
}
