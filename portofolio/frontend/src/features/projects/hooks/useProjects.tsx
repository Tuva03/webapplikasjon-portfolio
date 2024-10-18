// useProjects.ts
import { useEffect, useState } from "react";
import { ProjectProps } from "../../../components/Types";
import { ofetch } from "ofetch";

export default function useProjects(props: ProjectProps[] = []) {
  const [projects, setProjects] = useState<ProjectProps[]>(props);

  const onAddProject = (project: {
    title: string;
    description: string;
    categories: string | string[];
    repo_link: string;
  }) => {
    setProjects((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: project.title,
        beskrivelse: project.description,
        categories: Array.isArray(project.categories)
          ? project.categories
          : [project.categories],
        repo_link: project.repo_link,
      },
    ]);
  };

  const removeProject = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  const initializeData = async () => {
    console.log("Fetching data...");
    try {
      const fetchedProjects = await ofetch("http://localhost:3999/projects");
      console.log("Data fetched");
      setProjects(fetchedProjects.prosjekter);
      console.log("Data initialized");
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  return { projects, onAddProject, removeProject };
}
