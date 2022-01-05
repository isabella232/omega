export const releaseFilters = [
  { 
    value: "all", 
    name: "All Release Items", 
    predicate: (epic) => true 
  },
  { 
    value: "external", 
    name: "Public / External Release Items", 
    predicate: (epic) => epic.isExternal,
  },
  { 
    value: "part-of-narrative", 
    name: "Part of Release Narrative", 
    predicate: (epic) => epic.isPartOfReleaseNarrative,
    style: "el-icon-s-promotion el-icon--right",
  },
  { 
    value: "at-risk", 
    name: "Release at Risk", 
    predicate: (epic) => epic.isReleaseAtRisk,
    style: "el-icon-warning el-icon--right",
  },
];

export const defaultReleaseFilter = releaseFilters[0];

