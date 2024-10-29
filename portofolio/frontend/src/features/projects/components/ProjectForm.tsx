import UseProjectForm from "../hooks/useProjectForm";

type ProjectFormProps = {
  addProject: (title: string) => void;
};

export default function ProjectForm(props: Readonly<ProjectFormProps>) {
  const { addProject } = props;

  const { handleSubmit, getFieldProps, isFieldInvalid } = UseProjectForm({
    initialFields: {
      title: "",
      description: "",
      categories: "",
      repolink: "",
      publishedAt: "",
      isPublic: false,
      status: false,
      tags: "",
    },
    onSubmit: (data) => {
      /*
      console.log("Form submitted with data:", data); // Debugging line
      addProject(data.title);
      */
      const formattedData = {
        ...data,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(), // or handle with a default value
      };
      console.log("Form submitted with data:", formattedData);
      addProject(formattedData);
    },

    validate: {
      title: (_, value) => value.length > 1,
      description: (_, value) => value.length > 2,
      categories: (_, value) => value.length > 2,
      repolink: (_, value) => value.length > 2,
      publishedAt: (_, value) =>
        (typeof value === "string" && value.length > 0) ||
        (value instanceof Date && !isNaN(value.getTime())),
      isPublic: () => true, // Always valid
      status: () => true, // Allow both true and false
      tags: (_, value) => value.length > 1,
    },
  });

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
              className={!isFieldInvalid ? "success" : ""}
              required
              placeholder="Prosjekt tittel..."
              {...getFieldProps("title")}
            />
            {isFieldInvalid("title") ? (
              <p className="field-error error">
                Navnet må være minst 3 tegn langt
              </p>
            ) : null}
          </label>
          <label htmlFor="description">
            Beskrivelse:
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Beskrivelse..."
              {...getFieldProps("description")}
            />
          </label>
          <label htmlFor="category">
            Kategori:
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Kategorier..."
              {...getFieldProps("categories")}
            />
          </label>
          <label htmlFor="repolink">
            Link til repo:
            <input
              type="text"
              id="repolink"
              name="repolink"
              placeholder="Link til Github..."
              {...getFieldProps("repolink")}
            />
          </label>
          <label htmlFor="publishedAt">
            Publiserings dato (yyyy-mm-dd)
            <input
              id="publishedAt"
              type="date"
              {...getFieldProps("publishedAt")}
            />
          </label>
          <label htmlFor="isPublic">
            Er prosjektet offentlig? Kryss av hvis ja, ellers er prosjektet
            privat
            <input
              type="checkbox"
              id="isPublic"
              name="isPublic"
              //checked={fields.isPublic.value}
              {...getFieldProps("isPublic")}
            />
          </label>
          <label htmlFor="status">
            Er prosjektet publisert? Kryss av hvis ja, ellers er prosjektet
            arkivert
            <input
              type="checkbox"
              id="status"
              name="status"
              //checked={fields.status.value}
              {...getFieldProps("status")}
            />
          </label>
          <label htmlFor="tags">
            Tagger:
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Tagger..."
              {...getFieldProps("tags")}
            />
          </label>

          {/*
          <pre>
            {JSON.stringify({ title, description, categories, repolink, publishedAt })}
          </pre>
          */}
          <button type="submit" id="submit" className="success">
            Legg til
          </button>
        </form>
      </section>
    </>
  );
}
