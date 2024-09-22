import Project from "./Project"
import { ProjectProps } from "./Types"
import { useState } from "react";

type ProjectsProps = {
    projects: ProjectProps[];
};

export default function Total(props: Readonly<ProjectProps>) {
    const { total } = props

    const [projects, setProjects] = useState<ProjectProps[]>(
        props.projects ?? []
    );

    return (
        projects.map((project) => (
            <>
                <Total category={project.category}></Total>
            </>
        ))
    )
}