import Project from '../models/Project.js';
import Skill from '../models/Skill.js';

export const getPortfolio = async (req, res) => {
  try {
    const projects = await Project.find();
    const skills = await Skill.find();
    res.json({ projects, skills });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch portfolio data', error });
  }
};

export const addProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add project', error });
  }
};

export const addSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add skill', error });
  }
};


export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json({ message: 'Project deleted successfully', project: deletedProject });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete project', error });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSkill = await Skill.findByIdAndDelete(id);
    
    if (!deletedSkill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    res.json({ message: 'Skill deleted successfully', skill: deletedSkill });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete skill', error });
  }
};