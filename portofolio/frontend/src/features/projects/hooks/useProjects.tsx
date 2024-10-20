// useProjects.ts
import { useEffect, useState } from "react";
import { ProjectProps } from "../../../components/Types";
import { ofetch } from "ofetch";
import { baseUrl, endpoints } from "../../../config/urls";
import { projectsSchema } from "../helpers/validators";

export default function useProjects(props: ProjectProps[] = []) {
  const [projects, setProjects] = useState<ProjectProps[]>(props);

  const addProject = (project: {
    title: string;
    description: string;
    categories: string | string[];
    repolink: string;
    publishedAt: Date;
  }) => {
    setProjects((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: project.title,
        description: project.description,
        categories: Array.isArray(project.categories)
          ? project.categories
          : [project.categories],
        repolink: project.repolink,
        publishedAt: project.publishedAt,
      },
    ]);
  };

  const removeProject = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  const initializeData = async () => {
    console.log("Fetching data...");
    try {
      const fetchedProjects = await ofetch(endpoints.projects);
      console.log(projectsSchema.safeParse(projects)); // Se feilene
      console.log("Data fetched");
      //return projectsSchema.parse(projects.data);
      setProjects(fetchedProjects.prosjekter);
      console.log("Data initialized");
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  return { projects, addProject, removeProject };
}
