import ProjectListItem from "./ProjectListItem";

const ProjectList = ({ projectList, isEditable }) => {
  const projectListArray = projectList?.map((item) => {
    return (
      <ProjectListItem
        key={item.id}
        id={item.id}
        item={item}
        isEditable={isEditable}
      />
    );
  });
  return <>{projectListArray}</>;
};

export default ProjectList;
