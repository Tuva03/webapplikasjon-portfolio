import { Action, ProjectProps as Project } from "../../../components/Types";
import useProjects from "../hooks/useProjects";
import Projects from "../components/Project";

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
          return;
        }

        const publishedAtDate = new Date(project.publishedAt);
        console.log("Parsed publishedAt:", publishedAtDate);

        if (isNaN(publishedAtDate.getTime())) {
          console.error("Invalid publishedAt date:", project.publishedAt);
          return;
        }

        addProject({
          title: project.title,
          description: project.description,
          categories: project.categories,
          repolink: project.repolink,
          publishedAt: publishedAtDate,
          isPublic: project.isPublic,
          status: project.status,
          tags: project.tags,
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

  return (
    <Projects
      projects={projects}
      addProject={addProject}
      handleProjectMutation={handleProjectMutation}
    />
  );
}
