import React from 'react';

const ProjectsTable = ({ projects, currentPage, itemsPerPage }) => {
  if (!projects || projects.length === 0) {
    return <p>No projects to display.</p>;
  }

  return (
    <table className="projects-table">
      <thead>
        <tr>
          <th>S.No.</th>
          <th>Percentage Funded</th>
          <th>Amount Pledged</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project, index) => (
          <tr key={project['s.no']}>
            <td>{(currentPage - 1) * itemsPerPage + index}</td>
            <td>{project['percentage.funded']}%</td>
            <td>${project['amt.pledged']}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectsTable;
