import { Action, ProjectProps as Project } from "../../../components/Types";
import useProjects from "../hooks/useProjects";
import Projects from "../components/Project";
import { useEffect } from "react";

export default function ProjectPage() {
  useEffect(() => {
    console.log("ProjectPage component mounted");
  }, []);

  const initialProjects: Project[] = [];
  const { projects, onAddProject, removeProject } =
    useProjects(initialProjects);

  const handleProjectMutation = (action: Action, data: Partial<Project>) => {
    const { id, ...project } = data;
    console.log("handleProjectMutation called with:", action, data);

    switch (action) {
      case "add":
        console.log("Adding project:", project);
        onAddProject({
          title: project.title,
          description: project.beskrivelse,
          categories: project.categories,
          repo_link: project.repo_link,
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
      onAddProject={onAddProject}
      handleProjectMutation={handleProjectMutation}
    />
  );
}
