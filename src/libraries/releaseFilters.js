export const releaseFilters = [
  { 
    value: "all", 
    name: "All Release Items", 
    predicate: (epic) => true 
  },
  { 
    value: "external", 
    name: "Public / External Release Items", 
    predicate: (epic) => epic.isExternal 
  },
  { 
    value: "part-of-narrative", 
    name: "Part of Release Narrative", 
    predicate: (epic) => epic.isPartOfReleaseNarrative 
  },
  { 
    value: "at-risk", 
    name: "Release at Risk", 
    predicate: (epic) => epic.isReleaseAtRisk 
  },
];

export const defaultReleaseFilter = releaseFilters[0];

