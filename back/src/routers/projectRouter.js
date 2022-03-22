import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";

const projectRouter = Router();
projectRouter.use(login_required)

projectRouter.post("/project/create", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const user_id = req.body.user_id;
    const title = req.body.title;
    const description = req.body.description;
    const from_date = req.body.from_date;
    const to_date = req.body.to_date;

    // 위 데이터를 유저 db에 추가하기
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

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

projectRouter.get('/projects/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const foundProject = await projectService.getProject({ id })
    if (foundProject.errorMessage) {
      throw new Error(foundProject.errorMessage);
    }

    res.status(200).json(foundProject);
  } catch (error) {
    next(error);
  }
})

projectRouter.put('/projects/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const foundProject = await projectService.getProject({ id })
    if (foundProject.errorMessage) {
      throw new Error(foundProject.errorMessage);
    }
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;
    const from_date = req.body.from_date ?? null;
    const to_date = req.body.to_date ?? null;

    const toUpdate = { title, description, from_date, to_date };

    const updatedProject = await projectService.setProject({ id, toUpdate });

    if (updatedProject.errorMessage) {
      throw new Error(updatedProject.errorMessage);
    }

    res.status(200).json(updatedProject);

  } catch (error) {
    next(error);
  }
})

projectRouter.get('/projectlist/:user_id', async (req, res, next) => {
  const { user_id } = req.params
  try {
    const foundList = await projectService.getProjectList({ user_id })

    res.status(200).json(foundList);

  } catch (error) {
    next(error);
  }
})

projectRouter.get(
  "/projectlist",
  async function (req, res, next) {
    try {
      // URI로부터 user_id를 추출함.
      const { findKey, findWord } = req.query;
      
      const keyOptions = findKey.split(" ")
      const searchOpt = keyOptions.map(v => {
        const arr = {}
        arr[v] = {$regex: findWord, '$options': "i"}
        return arr
      })

      const foundList = await projectService.searchProjectList({ searchOpt });
      res.status(200).send(foundList);
    } catch (error) {
      next(error);
    }
  }
);

export { projectRouter };