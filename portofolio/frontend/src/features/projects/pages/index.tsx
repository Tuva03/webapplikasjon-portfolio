import { Action, ProjectProps as Project } from "../../../components/Types";
import useProjects from "../hooks/useProjects";
import Projects from "../components/Project";
import { useEffect } from "react";

export default function ProjectPage() {
  //useEffect(() => {
  //  console.log("ProjectPage component mounted");
  //}, []);

  const initialProjects: Project[] = [];
  const { projects, addProject, removeProject } = useProjects(initialProjects);

  const handleProjectMutation = (action: Action, data: Partial<Project>) => {
    const { id, ...project } = data;
    console.log("handleProjectMutation called with:", action, data);

    switch (action) {
      case "add":
        console.log("Adding project:", project);

        if (!project.publishedAt) {
          console.error("publishedAt is undefined");
          return; // Handle the case where publishedAt is not provided
        }

        const publishedAtDate = new Date(project.publishedAt);
        console.log("Parsed publishedAt:", publishedAtDate);

        if (isNaN(publishedAtDate.getTime())) {
          console.error("Invalid publishedAt date:", project.publishedAt);
          return; // Handle invalid date
        }

        addProject({
          title: project.title,
          description: project.description,
          categories: project.categories,
          repolink: project.repolink,
          publishedAt: publishedAtDate,
        });

        break;
      case "remove":
        console.log("Removing project with id:", id);
        removeProject(id);
        break;
      default:
        break;
    }
  };

  //if (!projects || projects.length === 0) return <p>Laster ...</p>;

  return (
    <Projects
      projects={projects}
      addProject={addProject}
      handleProjectMutation={handleProjectMutation}
    />
  );
}
