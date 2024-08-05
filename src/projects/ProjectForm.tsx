import { SyntheticEvent, useState } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
    onCancel: () => void;
    onSave: (project: Project) => void;
    project: Project;
}

function ProjectForm({onCancel, onSave, project: initialProject}: ProjectFormProps) {
    const [project, setProject] = useState(initialProject);
    const [errors, setErrors] = useState({
        name: "",
        description: "",
        budget: ""
    });
    
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        if(!isValid()) return;
        onSave(project);
    }

    const handleChange = (e: any) => {
        const {type, name, value, checked} = e.target;

        let updatedValue = type === "checked" ? checked : value;

        if(type === "number") {
            updatedValue = Number(updatedValue);
        }

        const change = {
            [name]: updatedValue
        };

        let updatedProject: Project;

        setProject((p) => {
            updatedProject = new Project({...p, ...change});
            return updatedProject;
        });

        setErrors(() => validation(updatedProject));
    }

    function validation(project: Project) {
        let errors: any = {
            name: "",
            description: "",
            budget: ""
        }

        if(project.name.length === 0) {
            errors.name = "Name is required"
        }

        if(project.name.length > 0 && project.name.length < 3) {
            errors.name = "Name needs to be at least 3 characters.";
        }

        if(project.description.length === 0) {
            errors.description = "Description is required.";
        }

        if(project.budget === 0) {
            errors.budget = "Budget must be more than $0.";
        }

        return errors;
    }

    function isValid() {
        return (
            errors.name.length === 0 &&
            errors.description.length === 0 &&
            errors.budget.length === 0
        )
    }

    return (
        <form className="input-group vertical" onSubmit={handleSubmit}>
            <label htmlFor="name">Project Name</label>
            <input 
                type="text" 
                name="name" 
                placeholder="enter name" 
                value={project.name}
                onChange={handleChange}
            />
            {
                errors.name.length > 0 && (
                    <div className="card error">
                        <p>{errors.name}</p>
                    </div>
                )
            }
            <label htmlFor="description">Project Description</label>
            <textarea 
                name="description" 
                placeholder="enter description" 
                value={project.description}
                onChange={handleChange}    
            />
            {
                errors.description.length > 0 && (
                    <div className="card error">
                        <p>{errors.description}</p>
                    </div>
                )
            }
            <label htmlFor="budget">Project Budget</label>
            <input 
                type="number" 
                name="budget" 
                placeholder="enter budget" 
                value={project.budget}
                onChange={handleChange}
            />
             {
                errors.budget.length > 0 && (
                    <div className="card error">
                        <p>{errors.budget}</p>
                    </div>
                )
            }
            <label htmlFor="isActive">Active?</label>
            <input 
                type="checkbox" 
                name="isActive" 
                checked={project.isActive}
                onChange={handleChange}
            />
            <div className="input-group">
                <button className="primary bordered medium">Save</button>
                <span />
                <button onClick={onCancel} type="button" className="bordered medium">
                    cancel
                </button>
            </div>
        </form>
    );
}

export default ProjectForm;