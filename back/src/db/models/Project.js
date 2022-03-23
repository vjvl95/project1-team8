import { ProjectModel } from "../schemas/project";

class Project {
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  static async findByUserId({ user_id }) {
    const projectList = await ProjectModel.find({ user_id: user_id });
    return projectList;
  }

  static async findByProjectId({ projectId }) {
    const project = await ProjectModel.findOne({ id: projectId });
    return project;
  }


  static async update({ projectId, fieldToUpdate, newValue }) {
    const filter = { id: projectId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  }

  static async deleteByProjectId({ projectId }) {
    const result = await ProjectModel.deleteOne({ id: projectId });
    const deletedResult = (result.deletedCount == 1) //Boolean
    return deletedResult;
  }

  static async deleteByUserId({ user_id }) {
    const result = await ProjectModel.deleteMany({ user_id });
    return result;
  }
  
  static async findBySearchWord({ searchOpt }) {
    const projectList = await ProjectModel.find({ $or: searchOpt });
    return projectList;
  }
}

export { Project };
