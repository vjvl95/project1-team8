import { Project } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";
import { findError } from "../utils/errorMessages"

class projectService {
  static async addProject({ user_id, title, description, from_date, to_date }) {
    // id 는 유니크 값 부여
    const id = uuidv4();
    const newProject = { id, user_id, title, description, from_date, to_date };

    // db에 저장
    const createdNewProject = await Project.create({ newProject });
    createdNewProject.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewProject;
  }

  static async getProject({ projectId }) {
    // id가 project db에 존재 여부 확인
    const project = await Project.findByProjectId({ projectId });
    if (!project) {
      const errorMessage = findError("프로젝트")
      return { errorMessage };
    }
    project.errorMessage = null;
    return project;
  }

  static async getProjectList({ user_id }) {
    const projectList = await Project.findByUserId({ user_id });
    return projectList;
  }

  static async setProject({ projectId, toUpdate }) {
    // id가 project db에 존재 여부 확인
    let project = await Project.findByProjectId({ projectId });
    if (!project) {
      const errorMessage = findError("프로젝트")
      return { errorMessage };
    }
    project.errorMessage = null;

    if (toUpdate.title) {
      const fieldToUpdate = 'title';
      const newValue = toUpdate.title;
      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = 'description';
      const newValue = toUpdate.description;
      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }

    if (toUpdate.from_date) {
      const fieldToUpdate = 'from_date';
      const newValue = toUpdate.from_date;
      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }

    if (toUpdate.to_date) {
      const fieldToUpdate = 'to_date';
      const newValue = toUpdate.to_date;
      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }

    return project;
  }

  static async deleteProject({ projectId }) {
    // awardId db에 존재 여부 확인

    const deletedResult = await Project.deleteByProjectId({ projectId });
    if (!deletedResult) {
      const errorMessage = findError("프로젝트")
      return { errorMessage };
    }

    return deletedResult;
  }

  static async searchProjectList({ searchOpt }) {
    const projectList = await Project.findBySearchWord({ searchOpt });
    return projectList;
  }
}
export { projectService };
