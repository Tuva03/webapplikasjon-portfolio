import { useState, type FormEvent } from "react";
import { AddProjectFormProps } from "./Types";

export default function CreateProject({ onAddProject }: AddProjectFormProps) {
  const [titleValid, setTitleValid] = useState(false);
  const [titleIsDirty, setTitleIsDirty] = useState(false);
  const [titleIsTouched, setTitleIsTouched] = useState(false);

  const [descriptionValid, setDescriptionValid] = useState(false);
  const [descriptionIsDirty, setDescriptionIsDirty] = useState(false);
  const [descriptionIsTouched, setDescriptionIsTouched] = useState(false);

  const [repolinkValid, setRepoLinkValid] = useState(false);
  const [repolinkIsDirty, setRepoLinkIsDirty] = useState(false);
  const [repolinkIsTouched, setRepoLinkIsTouched] = useState(false);

  const [categoryValid, setCategoryValid] = useState(false);
  const [categoryIsDirty, setCategoryIsDirty] = useState(false);
  const [categoryIsTouched, setCategoryIsTouched] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [repolink, setRepoLink] = useState("");
  const [categories, setCategory] = useState("");

  const [input, setInput] = useState<
    {
      id: string;
      title: string;
      description: string;
      categories: string;
      repolink: string;
    }[]
  >([]);

  const updateFormTitle = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    setTitleIsDirty(true);
    setTitle(input.value);
  };

  const updateFormDescription = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    setDescriptionIsDirty(true);
    setDescription(input.value);
  };

  const updateFormRepoLink = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    setRepoLinkIsDirty(true);
    setRepoLink(input.value);
  };

  const updateFormCategory = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    setCategoryIsDirty(true);
    setCategory(input.value);
  };

  const validateTitleInput = (title: string) => {
    if (titleIsTouched && titleIsDirty) {
      setTitleValid(title.trim().length > 2);
    }
  };

  const validateDescriptionInput = (description: string) => {
    if (descriptionIsTouched && descriptionIsDirty) {
      setDescriptionValid(description.trim().length > 2);
    }
  };

  const validateRepoLinkInput = (repolink: string) => {
    if (repolinkIsTouched && repolinkIsDirty) {
      setRepoLinkValid(repolink.trim().length > 2);
    }
  };

  const validateCategoryInput = (categories: string) => {
    if (categoryIsTouched && categoryIsDirty) {
      setRepoLinkValid(categories.trim().length > 2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !categories || !repolink) return;

    const form = e.target as HTMLFormElement | null;

    if (!form) return;

    onAddProject({ title, description, categories, repo_link: repolink });

    console.log(title, description, categories, repolink);

    setInput((prevInput) => [
      ...prevInput,
      { id: crypto.randomUUID(), title, description, categories, repolink },
    ]);

    setTitle("");
    setDescription("");
    setRepoLink("");
    setCategory("");
    setTitleIsDirty(false);
    setTitleIsTouched(false);
    setTitleValid(false);
    setDescriptionIsDirty(false);
    setDescriptionIsTouched(false);
    setDescriptionValid(false);
    setRepoLinkIsDirty(false);
    setRepoLinkIsTouched(false);
    setRepoLinkValid(false);
    setCategoryIsDirty(false);
    setCategoryIsTouched(false);
    setCategoryValid(false);
  };

  return (
    <>
      <section id="legg_til_prosjekt">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">
            Prosjekt tittel:
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Prosjekt navn..."
              onChange={updateFormTitle}
              onFocus={() => {
                console.log("onFocus");
                setTitleIsTouched(true);
              }}
              onBlur={() => {
                console.log("onBlur");
                validateTitleInput(title);
              }}
              value={title}
            />
          </label>
          <label htmlFor="description">
            Beskrivelse:
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Beskrivelse..."
              onChange={updateFormDescription}
              onFocus={() => {
                console.log("onFocus");
                setDescriptionIsTouched(true);
              }}
              onBlur={() => {
                console.log("onBlur");
                validateDescriptionInput(description);
              }}
              value={description}
            />
            {!descriptionValid && descriptionIsDirty ? (
              <p className="warning">OBS! Teksten må være minst 3 tegn langt</p>
            ) : null}
          </label>
          <label htmlFor="category">
            Kategori:
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Kategorier..."
              onChange={updateFormCategory}
              onFocus={() => {
                console.log("onFocus");
                setCategoryIsTouched(true);
              }}
              onBlur={() => {
                console.log("onBlur");
                validateCategoryInput(categories);
              }}
              value={categories}
            />
            {!categoryValid && categoryIsDirty ? (
              <p className="warning">OBS! Input må være minst 3 tegn langt</p>
            ) : null}
          </label>
          <label htmlFor="repolink">
            Link til repo:
            <input
              type="text"
              id="repolink"
              name="repolink"
              placeholder="Link til Github..."
              onChange={updateFormRepoLink}
              onFocus={() => {
                console.log("onFocus");
                setRepoLinkIsTouched(true);
              }}
              onBlur={() => {
                console.log("onBlur");
                validateRepoLinkInput(repolink);
              }}
              value={repolink}
            />
            {!repolinkValid && repolinkIsDirty ? (
              <p className="warning">OBS! Linken må være minst 3 tegn langt</p>
            ) : null}
          </label>
          <pre>
            {JSON.stringify({ title, description, categories, repolink })}
          </pre>

          <button type="submit">Legg til prosjekt</button>
        </form>
      </section>
    </>
  );
}
