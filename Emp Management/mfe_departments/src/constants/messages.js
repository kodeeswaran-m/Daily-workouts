export const MESSAGES = {
  DELETE_SUCCESS: "Department deleted successfully",
  DELETE_FAILURE: "Failed to delete department",

  CREATE_SUCCESS: "Department created successfully",
  CREATE_FAILURE: "Failed to create department",
  UPDATE_SUCCESS: "Department updated successfully",
  UPDATE_FAILURE: "Failed to update department",
  GENERIC_ERROR: "An error occurred",

  LOADING: "Loading department...",
  FETCH_ERROR: "⚠️ Failed to load department details: ",
  ASSIGN_SUCCESS: "Employee assigned successfully.",
  ASSIGN_FAILURE: "Failed to assign employee.",
  UNASSIGN_SUCCESS: "Employee unassigned successfully.",
  UNASSIGN_FAILURE: "Failed to unassign Employee.",
  NO_DESCRIPTION: "No description provided",
  NOT_ASSIGNED: "Not Assigned",
  NO_PROJECTS: "No projects",
  NO_GOALS: "No goals",
};

export const REQUIRED_FIELDS_ARRAY=[
      "name",
      "code",
      "description",
      "location",
      "budget",
      "establishedDate",
      "status",
    ];