import React, { useEffect } from 'react';
import { useState } from 'react';
import { updateProject } from './services/projectService';
import './projects.scss';

const ProjectList = ({ projects, onSelectProject, onProjectUpdated }) => {
//saljemo i onProjectUpdated jer cemo tako dobijati sva azuriranja
  const [isActive, setIsActive] = useState(null);

  const handleClick = (id) => {
    onSelectProject(id);
    setIsActive(id);
  }

  const handleDraftProject = async (id) => {
    const project = projects.find(p => p.id === id);
    const dto = {
      name: project.name,
      description: project.description,
      startedAt: project.startedAt,
      completedAt: project.completedAt,
      status: "Published"
    }
    await updateProject(project.id, dto);
    onProjectUpdated();
  }

  const handlePublishedProject = async (id) => {
    const project = projects.find(p => p.id === id);
    const dto = {
      name: project.name,
      description: project.description,
      startedAt: project.startedAt,
      completedAt: new Date().toISOString(),
      status: "Completed"
    }
    await updateProject(project.id, dto);
    onProjectUpdated();
  }

  const handleCompletedProject = async (id) => {
    const project = projects.find(p => p.id === id);
    const dto = {
      name: project.name,
      description: project.description,
      startedAt: project.startedAt,
      completedAt: null,
      status: "Draft"
    }
    await updateProject(project.id, dto);
    onProjectUpdated();
  }

  return (
    <div className="project-list">
      {projects.map((project) => (
        <div key={project.id} className="project-card" style={{
          backgroundColor: isActive == project.id ? '#deeeff' : '',
        }}>
          <div className="project-card-header">
            <h3 className="project-name">{project.name}</h3>
            {onSelectProject && (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleClick(project.id)}//promena da se kartica oboji plavo
              >
                Izmeni
              </button>
            )}
            {onSelectProject && project.status == "Draft" ? ( //promena da se prebaci u published
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleDraftProject(project.id)}
              >
                Zapocni
              </button>
            ) : " "}

            {onSelectProject && project.status == "Published" ? ( //promena da se prebaci u Completed
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handlePublishedProject(project.id)}
              >
                Zakljuci
              </button>
            ) : " "}

            {onSelectProject && project.status == "Completed" ? ( //promena da se prebaci u u pripremi
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleCompletedProject(project.id)}
              >
                Vrati u pripremu
              </button>
            ) : " "}
          </div>
          <p className="project-description">{project.description}</p>
          <div className="project-meta">
            <span className="project-status">Status: {project.status}</span>
            <span>Započet: {new Date(project.startedAt).toLocaleDateString()}</span>
            {project.completedAt && (
              <span>Završen: {new Date(project.completedAt).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
