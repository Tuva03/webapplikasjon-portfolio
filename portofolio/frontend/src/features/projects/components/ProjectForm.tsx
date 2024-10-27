import { useState, type FormEvent } from "react";
import { ProjectProps } from "../../../components/Types";
import UseProjectForm from "../hooks/useProjectForm";

type ProjectFormProps = {
  addProject: (project: ProjectProps) => void;
};

export default function ProjectForm(props: Readonly<ProjectFormProps>) {
  const { addProject } = props;

  const {
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
  } = UseProjectForm({ handler: addProject });

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
          <label htmlFor="publishedAt">Publiserings dato (yyyy-mm-dd)</label>
          <input
            id="publishedAt"
            type="date"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
          />
          {/*
          <pre>
            {JSON.stringify({ title, description, categories, repolink, publishedAt })}
          </pre>
          */}
          <button type="submit">Legg til prosjekt</button>
        </form>
      </section>
    </>
  );
}
