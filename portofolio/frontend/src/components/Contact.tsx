import { type FormEvent, useState } from "react";
import type { ContactProps } from "./Types";

export default function Contact(props: Readonly<ContactProps>) {
  const { email } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    alert("Mail:" + " " + email);
  };

  // Brukes til validering av input til 'name'
  const [nameValid, setNameValid] = useState(false);
  const [nameIsDirty, setNameIsDirty] = useState(false);
  const [nameIsTouched, setNameIsTouched] = useState(false);
  // Brukes til validering av input til 'textarea'
  const [textareaValid, setTextAreaValid] = useState(false);
  const [textareaIsDirty, setTextAreaIsDirty] = useState(false);
  const [textareaIsTouched, setTextAreaIsTouched] = useState(false);

  const [name, setName] = useState("");
  const [textarea, setTextarea] = useState("");

  const [input, setInput] = useState<
    { id: string; name: string; textarea: string }[]
  >([]);

  const updateFormName = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    setNameIsDirty(true);
    setName(input.value);
  };

  const updateFormTextArea = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    setTextAreaIsDirty(true);
    setTextarea(input.value);
  };

  const validateNameInput = (name: string) => {
    if (nameIsTouched && nameIsDirty) {
      setNameValid(name.trim().length > 2);
    }
  };

  const validateTextAreaInput = (textarea: string) => {
    if (textareaIsTouched && textareaIsDirty) {
      setTextAreaValid(textarea.trim().length > 2);
    }
  };

  const contactStudent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !textarea) return;

    const form = event.target as HTMLFormElement | null;

    if (!form) return;

    console.log(name, textarea);

    setInput((prevInput) => [
      ...prevInput,
      { id: crypto.randomUUID(), name, textarea },
    ]);

    setName("");
    setTextarea("");
    setNameIsDirty(false);
    setNameIsTouched(false);
    setNameValid(false);
    setTextAreaIsDirty(false);
    setTextAreaIsTouched(false);
    setTextAreaValid(false);
  };

  return (
    <section id="kontakt">
      <p>Kontaktinformasjon: {email}</p>
      <button id="kontaktinfo" onClick={handleClick}>
        Vis kontaktinformasjonen min
      </button>
      <pre>{JSON.stringify({ name, textarea })}</pre>
      <form onSubmit={contactStudent}>
        <label htmlFor="name">
          Navn:
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Navnet ditt..."
            onChange={updateFormName}
            onFocus={() => {
              console.log("onFocus");
              setNameIsTouched(true);
            }}
            onBlur={() => {
              console.log("onBlur");
              validateNameInput(name);
            }}
            value={name}
          />
          {!nameValid && nameIsDirty ? (
            <p className="warning">OBS! Navnet må være minst 3 tegn langt</p>
          ) : null}
        </label>
        <label htmlFor="textarea">
          Tekst:
          <input
            type="text"
            id="textarea"
            name="textarea"
            placeholder="Hva du vil si til meg..."
            onChange={updateFormTextArea}
            onFocus={() => {
              console.log("onFocus");
              setTextAreaIsTouched(true);
            }}
            onBlur={() => {
              console.log("onBlur");
              validateTextAreaInput(textarea);
            }}
            value={textarea}
          />
          {!textareaValid && textareaIsDirty ? (
            <p className="warning">OBS! Teksten må være minst 3 tegn langt</p>
          ) : null}
        </label>
        <button id="kontaktsubmit" type="submit">
          Send kontaktskjema
        </button>
      </form>
    </section>
  );
}
