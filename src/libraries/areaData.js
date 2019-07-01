import { DatePicker } from "element-ui";
import { areaConfigs, areaOrderForOverview } from "../../config/areas";

export const STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'inprogress',
  DONE: 'done',
  POSTPONED: 'postponed',
  CANCELLED: 'cancelled',
  REPLANNED: 'replanned'
};

export default class AreaData {

  cycle = {
    name: "",
    start: "1975-01-01",
    delivery: "1975-01-01",
    end: "1975-01-01",
    launch: "Comments",
    progress: 0,
    progressWithInProgress: 0,
    progressByEpics: 0,
    weeks: 0,
    weeksDone: 0,
    weeksInProgress: 0,
    weeksNotToDo: 0,    
    epicsCount: 0,
    epicsDoneCount: 0,
    percentageNotToDo: 0
  }

  objectives = []

  constructor({ cycle, objectives } = {}) {
    if (cycle) this.cycle = cycle;
    if (objectives) this.objectives = objectives;
  }

  async fetch(areaUrlIdentifier) {
    try {
      let response = await fetch(`https://ems-omega-data.herokuapp.com/${areaUrlIdentifier}`);  
      this.applyData((await response.json()).devCycleData);
    } catch (e) {
      throw e;
    }

    return this;
  }

  async fetchOverview() {
    try {
      let response = await fetch(`https://ems-omega-data.herokuapp.com/overview`);
      let areaDataset = await response.json();
    
      let devCycleData = { cycle: areaDataset[0].devCycleData, groups: []};

      let areaNames = areaOrderForOverview.map((index) => areaConfigs[index].name);

      areaDataset = areaDataset.map((areaData, i) => {
        areaData.devCycleData.groups = areaData.devCycleData.groups.map((group) => {
          group.projects = group.projects.map((project) => {          
            project.area = areaNames[i];
            return project;
          });

          return group;
        });

        return areaData;
      });

      let areasGroups = areaDataset.map((areaData) => areaData.devCycleData.groups);
      devCycleData.groups = areasGroups.reduce((acc, areaGroups) =>  {
        areaGroups.forEach((areaGroup) => {
          let indexInAcc = acc.findIndex((el) => el.objective === areaGroup.objective);
          if (indexInAcc < 0) {
            acc.push(areaGroup);
          } else {
            acc[indexInAcc].projects = acc[indexInAcc].projects.concat(areaGroup.projects);
          }
        });

        return acc;        
      }, []);

      this.applyData(devCycleData);
    } catch (e) {
      throw e;
    }

    return this;
  }

  sortedByObjectiveLength() {
    let objectives = [...this.objectives].sort((objectiveA, objectiveB) => { return objectiveA.weeks < objectiveB.weeks ? 1 : -1; });
    return new AreaData({ cycle: this.cycle, objectives });
  }

  applyData(data) {
    Object.assign(this.cycle, data.cycle);

    this.objectives = data.groups.map((objective) => {
      let preparedObjective = {
        name: objective.objective,
        epicsCount: 0,
        epicsDoneCount: 0,        
        weeks: 0,
        weeksDone: 0,
        weeksInProgress: 0,
        weeksNotToDo: 0,
        progress: 0,
        progressWithInProgress: 0,
        progressByEpics: 0,
        percentageNotToDo: 0,
        projects: []
      };

      preparedObjective.projects = objective.projects.map((project) => {
        let preparedProject = {
          area: project.area,
          name: project.name,
          owner: project.crew,
          startDate: project.startDate,
          epicsCount: 0,
          epicsDoneCount: 0,
          weeks: 0,
          weeksDone: 0,
          weeksInProgress: 0,
          weeksTodo: 0,
          weeksNotToDo: 0,
          progress: 0,
          progressWithInProgress: 0,
          progressByEpics: 0,
          percentageNotToDo: 0,
          epics: project.epics
        }

        project.epics.forEach((epic) => {
          let effort = parseFloat(epic.effort);

          if (epic.status != STATUS.REPLANNED) {
            preparedProject.weeks += effort;
            preparedProject.epicsCount += 1;
          }

          if (epic.status == STATUS.TODO) {
            preparedProject.weeksTodo += epic.effort;
          } else if (epic.status == STATUS.DONE) {
            preparedProject.weeksDone += epic.effort;
            preparedProject.epicsDoneCount += 1;
          } else if (epic.status == STATUS.IN_PROGRESS) {
            preparedProject.weeksInProgress += epic.effort;
          } else if (epic.status == STATUS.POSTPONED || epic.status == STATUS.CANCELLED) {
            preparedProject.weeksNotToDo += epic.effort;
          }
        });

        preparedProject.progress = Math.round((preparedProject.weeksDone / preparedProject.weeks) * 100);
        preparedProject.progressWithInProgress = Math.round(((preparedProject.weeksDone + preparedProject.weeksInProgress) / preparedProject.weeks) * 100);
        preparedProject.progressByEpics = Math.round((preparedProject.epicsDoneCount / preparedProject.epicsCount) * 100);
        preparedProject.percentageNotToDo = Math.round((preparedProject.weeksNotToDo / preparedProject.weeks) * 100);

        preparedObjective.weeks += preparedProject.weeks;
        preparedObjective.weeksDone += preparedProject.weeksDone;
        preparedObjective.weeksInProgress += preparedProject.weeksInProgress;
        preparedObjective.weeksTodo += preparedProject.weeksTodo;
        preparedObjective.weeksNotToDo += preparedProject.weeksNotToDo;

        preparedObjective.epicsCount += preparedProject.epicsCount;
        preparedObjective.epicsDoneCount += preparedProject.epicsDoneCount;

        return preparedProject;
      });

      this.cycle.weeks += preparedObjective.weeks;
      this.cycle.weeksDone += preparedObjective.weeksDone;
      this.cycle.weeksInProgress += preparedObjective.weeksInProgress;
      this.cycle.weeksTodo += preparedObjective.weeksTodo;
      this.cycle.weeksNotToDo += preparedObjective.weeksNotToDo;      

      this.cycle.epicsCount += preparedObjective.epicsCount;
      this.cycle.epicsDoneCount += preparedObjective.epicsDoneCount;

      preparedObjective.progress = Math.round((preparedObjective.weeksDone / preparedObjective.weeks) * 100);
      preparedObjective.progressWithInProgress = Math.round(((preparedObjective.weeksDone + preparedObjective.weeksInProgress) / preparedObjective.weeks) * 100);
      preparedObjective.progressByEpics = Math.round((preparedObjective.epicsDoneCount / preparedObjective.epicsCount) * 100);
      preparedObjective.percentageNotToDo = Math.round((preparedObjective.weeksNotToDo / preparedObjective.weeks) * 100);

      return preparedObjective;
    });

    this.cycle.progress = Math.round((this.cycle.weeksDone / this.cycle.weeks) * 100);
    this.cycle.progressWithInProgress = Math.round(((this.cycle.weeksDone + this.cycle.weeksInProgress) / this.cycle.weeks) * 100);
    this.cycle.progressByEpics = Math.round((this.cycle.epicsDoneCount / this.cycle.epicsCount) * 100);
    this.cycle.percentageNotToDo = Math.round((this.cycle.weeksNotToDo / this.cycle.weeks) * 100);

    this.cycle.startMonth = new Date(this.cycle.start).toLocaleString('en-us', { month: 'short' });
    this.cycle.endMonth = new Date(this.cycle.end).toLocaleString('en-us', { month: 'short' });
    this.cycle.daysFromStartOfCycle = Math.floor(Math.abs(new Date(this.cycle.start) - new Date()) / 1000 / 86400);
    this.cycle.daysInCycle = Math.floor(Math.abs(new Date(this.cycle.start) - new Date(this.cycle.end)) / 1000 / 86400);
    this.cycle.currentDayPercentage = Math.round((this.cycle.daysFromStartOfCycle / this.cycle.daysInCycle) * 100);    
    if (this.cycle.currentDayPercentage > 100) this.cycle.currentDayPercentage = 100;
  }

  static create(areaUrlIdentifier) {
    return (new AreaData()).fetch(areaUrlIdentifier);
  }

  static createOverview() {
    return (new AreaData()).fetchOverview();
  }  
}