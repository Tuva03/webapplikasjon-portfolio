import { F } from "ofetch/dist/shared/ofetch.d0b3d489";
import { FormEvent, useState } from "react";

type UseProjectForm = {
  handler: (title: string) => void;
};

export function UseProjectForm(props: UseProjectForm) {
  const { handler } = props;

  const [titleValid, setTitleValid] = useState(false);
  const [titleIsDirty, setTitleIsDirty] = useState(false);
  const [titleIsTouched, setTitleIsTouched] = useState(false);
  const [title, setTitle] = useState("");

  const isInvalidTitle = !titleValid && titleIsDirty;

  const [descriptionValid, setDescriptionValid] = useState(false);
  const [descriptionIsDirty, setDescriptionIsDirty] = useState(false);
  const [descriptionIsTouched, setDescriptionIsTouched] = useState(false);
  const [description, setDescription] = useState("");

  const isInvalidDescription = !descriptionValid && descriptionIsDirty;

  const [repolinkValid, setRepoLinkValid] = useState(false);
  const [repolinkIsDirty, setRepoLinkIsDirty] = useState(false);
  const [repolinkIsTouched, setRepoLinkIsTouched] = useState(false);
  const [repolink, setRepoLink] = useState("");

  const isInvalidRepolink = !repolinkValid && repolinkIsDirty;

  const [categoryValid, setCategoryValid] = useState(false);
  const [categoryIsDirty, setCategoryIsDirty] = useState(false);
  const [categoryIsTouched, setCategoryIsTouched] = useState(false);
  const [categories, setCategory] = useState("");

  const isInvalidCategory = !categoryValid && categoryIsDirty;

  const [tagValid, setTagValid] = useState(false);
  const [tagIsDirty, setTafIsDirty] = useState(false);
  const [tagIsTouched, setTagIsTouched] = useState(false);
  const [tag, setTag] = useState("");

  const isInvalidTag = !tagValid && tagIsDirty;

  const [publishedAt, setPublishedAt] = useState("");

  /*
  const [input, setInput] = useState<
    {
      id: string;
      title: string;
      description: string;
      categories: string;
      repolink: string;
      publishedAt: Date;
    }[]
  >([]);
*/

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
  /*
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const publishedAtDate = new Date(publishedAt);

    const form = e.target as HTMLFormElement | null;

    if (!form) return;

    addProject({
      title,
      description,
      categories,
      repolink,
      publishedAt: publishedAtDate,
    });

    console.log(title, description, categories, repolink, publishedAt);

    setInput((prevInput) => [
      ...prevInput,
      {
        id: crypto.randomUUID(),
        title,
        description,
        categories,
        repolink,
        publishedAt: publishedAtDate,
      },
    ]);

    setDescription("");
    setRepoLink("");
    setCategory("");
    setPublishedAt("");
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
  */
  const reset = () => {
    setTitle("");
    setTitleIsDirty(false);
    setTitleIsTouched(false);
    setTitleValid(false);

    setDescription("");
    setDescriptionIsDirty(false);
    setDescriptionIsTouched(false);
    setDescriptionValid(false);

    setCategory("");
    setCategoryIsDirty(false);
    setCategoryIsTouched(false);
    setCategoryValid(false);

    setRepoLink("");
    setRepoLinkIsDirty(false);
    setRepoLinkIsTouched(false);
    setRepoLinkValid(false);

    setPublishedAt("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!titleValid || !descriptionValid) return;
    handler(title);
    handler(description);
    handler(categories);
    handler(repolink);
    handler(publishedAt);
    reset();
  };

  return {
    handleSubmit,

    title,
    isInvalidTitle,
    updateFormTitle,
    setTitleIsTouched,
    validateTitleInput,

    description,
    isInvalidDescription,
    updateFormDescription,
    setDescriptionIsTouched,
    validateDescriptionInput,

    categories,
    isInvalidCategory,
    updateFormCategory,
    setCategoryIsTouched,
    validateCategoryInput,

    repolink,
    isInvalidRepolink,
    updateFormRepoLink,
    setRepoLinkIsTouched,
    validateRepoLinkInput,

    publishedAt,
  };
}

export default UseProjectForm;
