import React, { useEffect, useState } from 'react';
import ProjectsTable from './components/ProjectsTable';
import Pagination from './components/Pagination';

function App() {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch projects.');
        }
        const data = await response.json();
        console.log('Fetched projects:', data.projects);
        setProjects(data || []);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage*itemsPerPage;
  const indexOfFirstItem = indexOfLastItem -itemsPerPage;
  const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="app">
      <h1>Highly-Rated Kickstarter Projects</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error:{error}</p>
      ) : (
        <>
          <ProjectsTable 
            projects={currentItems} 
            currentPage={currentPage} 
            itemsPerPage={itemsPerPage} 
          />
          <Pagination
            totalItems={projects.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default App;
