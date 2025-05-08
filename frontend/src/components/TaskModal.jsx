import {useEffect, useState} from 'react'
import axios from 'axios'

const TaskModal = ({projects, isVisible, onClose, onTaskCreated}) => {
    // Initialize state to match Django model fields exactly
    const [task, setTask] = useState({
        name: '',
        description: '',
        status: 'Not Started',
        employee: localStorage.getItem('user_id'),
        // No project field in Django model, but keeping for UI selection
        // Will be removed before sending to API
    });
    
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem('user')); 
    useEffect(() => {
        setUsername(username);
        // Reset form when modal visibility changes
        if (isVisible) {
            setTask({
                name: '',
                description: '',
                status: '',
                employee: '',
            });
            setError('');
        }
    }, [isVisible]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        
        // Validation
        if (!task.name) {
            setError('Please enter a task name.');
            setSubmitting(false);
            return;
        }
        if (!task.description) {
            setError('Please enter a task description.');
            setSubmitting(false);
            return;
        }

        // Create payload matching Django model exactly
        const payload = {
            name: task.name,
            description: task.description,
            status: task.status,
            
            employee: parseInt(localStorage.getItem('user_id')),
            // Don't include project as it's not in your Django model
        };
        
        try {
            // Make sure this endpoint matches your Django urls.py configuration
            const response = await axios.post('http://localhost:8000/api/projects/', payload);
            
            if (response.status === 201) {
                if (onTaskCreated) onTaskCreated(response.data);
                
                // Reset form
                setTask({
                    name: '',
                    description: '',
                    status: 'Not Started',
                    employee: localStorage.getItem('user_id'),
                });
                
                // Close modal
                if (onClose) onClose();
            }
        } catch (err) {
            console.error('Submission error:', err);
            
            let errorMessage = 'An unexpected error occurred. Please try again.';
            
            if (err.response) {
                console.log('Error response:', err.response.data);
                
                if (err.response.data && typeof err.response.data === 'object') {
                    // Extract field errors and format them
                    const fieldErrors = Object.entries(err.response.data)
                        .map(([field, errors]) => {
                            if (Array.isArray(errors)) {
                                return `${field}: ${errors.join(', ')}`;
                            }
                            return `${field}: ${errors}`;
                        })
                        .join('; ');
                    
                    if (fieldErrors) {
                        errorMessage = `Validation errors: ${fieldErrors}`;
                    } else if (err.response.data.detail) {
                        errorMessage = err.response.data.detail;
                    }
                } else if (typeof err.response.data === 'string') {
                    errorMessage = err.response.data;
                }
            } else if (err.message) {
                errorMessage = err.message;
            }
            
            setError(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // If modal is not visible, don't render anything
    if (!isVisible) return null;
      
    return (
        <div className="wrapper">

        <div className="   inset-0 g-opacity-50 z-50">
            <div className="bg-white w-1/4 rounded border shadow-lg p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Create New Project</h2>
                    {onClose && (
                        <button 
                            onClick={onClose} 
                            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                            aria-label="Close"
                        >
                            ×
                        </button>
                    )}
                </div>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Task Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            value={task.name}
                            placeholder="Task Name" 
                            className="mt-1 p-2 w-full border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea 
                            name="description" 
                            id="description" 
                            value={task.description}
                            className="mt-1 p-2 w-full border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                            placeholder="Task Description" 
                            onChange={handleChange}
                            rows="3"
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <select 
                            name="status" 
                            id="status" 
                            value={task.status}
                            className="mt-1 p-2 w-full border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                            onChange={handleChange}
                        >
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Complete">Complete</option>
                        </select>
                    </div>
                    <div>
                      <select className='mt-1 p-2 w-full border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                      name="employee" id="employee" value={task.employee} onChange={handleChange}>
                        <option value="">Select Employee</option>
                       <option name='employee' value={localStorage.getItem('user_id')}>1  </option>
                        </select>
                        <input className='hidden' name='employee' value={localStorage.getItem('user_id')}/>
                    </div>
                    
                    <button 
                        type="submit" 
                        className={`bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-medium ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={submitting}
                    >
                        {submitting ? 'Creating...' : 'Create Task'}
                    </button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default TaskModal