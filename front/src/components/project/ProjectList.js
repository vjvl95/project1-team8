import ProjectListItem from "./ProjectListItem";

const ProjectList = ({ projectList, isEditable, getProjectList }) => {
  const projectListArray = projectList?.map((item) => {
    return (
      <ProjectListItem
        key={item.id}
        id={item.id}
        item={item}
        isEditable={isEditable}
        getProjectList={getProjectList}
      />
    );
  });
  return <>{projectListArray}</>;
};

export default ProjectList;
