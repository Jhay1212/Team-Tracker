import {useEffect, useState} from 'react'
import axios from 'axios'
const ProjectsTable = () => {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/projects/');
                setProjects(res.data.results);
            } catch (error) {
                console.error('Error fetching projects:', error.message);
            }
            fetchProjects();
        }
    }, [projects])
  return (
    
    <div className="sm:full w-1/2 sm:mx-0 mx-auto">
        
    </div>

  )
}

export default ProjectsTable