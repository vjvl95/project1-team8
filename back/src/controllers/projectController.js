import is from "@sindresorhus/is";
import { projectService } from "../services/projectService";
import { headerError } from "../utils/errorMessages"

class projectController {
    static async addProject (req, res, next) {
        try {
          if (is.emptyObject(req.body)) {
            throw new Error(
              headerError
            );
          }
          // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
          const user_id = req.currentUserId;
          // req (request) 에서 데이터 가져오기
          const title = req.body.title;
          const description = req.body.description;
          const from_date = req.body.from_date;
          const to_date = req.body.to_date;
      
          // 위 데이터를 project db에 추가하기
          const newProject = await projectService.addProject({
            user_id,
            title,
            description,
            from_date,
            to_date,
          });
      
          if (newProject.errorMessage) {
            throw new Error(newProject.errorMessage);
          }
      
          res.status(201).end();
        } catch (error) {
          next(error);
        }
    }

    static async getProject (req, res, next) {
        try {
          const projectId = req.params.id;
          const foundProject = await projectService.getProject({ projectId });
          if (foundProject.errorMessage) {
            throw new Error(foundProject.errorMessage);
          }
      
          res.status(200).json(foundProject);
        } catch (error) {
          next(error);
        }
    }

    static async setProject (req, res, next) {
        try {
          const projectId = req.params.id;
          const title = req.body.title ?? null;
          const description = req.body.description ?? null;
          const from_date = req.body.from_date ?? null;
          const to_date = req.body.to_date ?? null;
      
          const toUpdate = { title, description, from_date, to_date };
      
          const updatedProject = await projectService.setProject({
            projectId,
            toUpdate,
          });
      
          if (updatedProject.errorMessage) {
            throw new Error(updatedProject.errorMessage);
          }
      
          res.status(200).json(updatedProject);
        } catch (error) {
          next(error);
        }
    }

    static async getProjectList (req, res, next) {
        try {
          const { user_id } = req.params;
          const foundList = await projectService.getProjectList({ user_id });
    
          res.status(200).json(foundList);
        } catch (error) {
          next(error);
        }
    }

    static async deleteProject (req, res, next) {
        try {
          const projectId = req.params.id;
          const deletedResult = await projectService.deleteProject({ projectId });
      
          if (deletedResult.errorMessage) {
            throw new Error(deletedResult.errorMessage);
          }
      
          res.status(200).end();
        } catch (error) {
          next(error);
        }
    }
}

export { projectController };