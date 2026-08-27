import React from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects, onProjectClick }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => onProjectClick(project)}
        />
      ))}
    </div>
  );
}
