type ContactProps = {
  email: string;
};

export default function Contact(props: Readonly<ContactProps>) {
  const { email } = props;
  return (
    <section>
      <p>Kontaktinformasjon: {email}</p>
    </section>
  );
}
