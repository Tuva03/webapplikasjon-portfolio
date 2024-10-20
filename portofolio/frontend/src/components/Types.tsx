export type ContactProps = {
  email: string;
};

export type AddProjectFormProps = {
  addProject: (project: {
    title: string;
    description: string;
    categories: string | string[];
    repolink: string;
    publishedAt: Date;
  }) => void;
};

export type ExperienceProps = {
  experiences: {
    name: string;
  }[];
};

export type HeaderProps = {
  name: string;
  degree: string;
  points: number;
};

export type ProjectProps = {
  id: string;
  title: string;
  description: string;
  categories: string | string[];
  repolink: string;
  publishedAt: Date;
};

export const actions = {
  add: "add",
  remove: "remove",
};

export type Action = (typeof actions)[keyof typeof actions];
