import Vuex from 'vuex'
import { calculateAreaData } from '../libraries/calculateAreaData'

export default function createStore(router) {
    const store = new Vuex.Store({
        state: {
            loading: false,
            error: true,

            pages: {
                all: [],
                current: {}
            },

            cycleData: null,
            areaDataset: null,
            stages: [],
            selectedStage: localStorage.selectedStage ? JSON.parse(localStorage.selectedStage) : null,
            sprints: [],
            selectedSprint: localStorage.selectedSprint ? JSON.parse(localStorage.selectedSprint) : null,
            assignees: [],
            validationEnabled: localStorage.validationEnabled ? JSON.parse(localStorage.validationEnabled) : true,
            selectedAssignee: localStorage.selectedAssignee ? JSON.parse(localStorage.selectedAssignee) : null,
            
            releaseFilters: [],
            selectedReleaseFilter: localStorage.selectedReleaseFilter ? JSON.parse(localStorage.selectedReleaseFilter) : null,
        },
        getters: {
            currentAreaData(state) {
              if (!state.cycleData) return null;
              const areaId = state.pages.current.id;

              const predicates = [];
              
              if(state.selectedStage.value !== 'all') {
                predicates.push((epic) => epic.stage === state.selectedStage.value);
              }

              if(state.selectedAssignee.accountId !== 'all') {
                predicates.push((epic) => epic.assignee && epic.assignee.accountId === state.selectedAssignee.accountId);
              }

              if(state.selectedReleaseFilter) {
                const selectedReleaseFilterObj = state.releaseFilters.find( 
                  filter => filter.value === state.selectedReleaseFilter.value );
                predicates.push( selectedReleaseFilterObj.predicate );
              }

              const epicFilter = (epic) => predicates.every((predicate) => predicate(epic));
              return calculateAreaData(state.cycleData, epicFilter)[areaId];
            },

            validationSummary(state, getters) {
              return getters.currentAreaData.objectives.map(objective => {
                return objective.projects.map(project => {
                  const epicsValidations = project.epics.map(epic => epic.validations).flat();
                  return [epicsValidations, project.validations].flat();
                }).flat();
              }).flat();
            },

            isOverviewPage(state) {
                return state.pages.current.id === 'overview'
            }
        },
        mutations: {
            loadingOn(state) {
                state.loading = true
            },

            loadingOff(state) {
                state.loading = false
            },

            clearError(state) {
                state.error = false
            },

            setError(state, error) {
                state.error = error
            },

            setReleaseFilters(state, releaseFilters) {
              state.releaseFilters = releaseFilters
            },

            setSelectedReleaseFilter(state, selectedReleaseFilter) {
              localStorage.selectedReleaseFilter = JSON.stringify(selectedReleaseFilter);
              state.selectedReleaseFilter = selectedReleaseFilter;
            },

            setStages(state, stages) {
              state.stages = stages
            },

            setSelectedStage(state, stage) {
              localStorage.selectedStage = JSON.stringify(stage);
              state.selectedStage = stage;
            },

            setCurrentPage(state, pageId) {
                if(state.pages.all.length === 0) return null;
                state.pages.current = state.pages.all.find((page) => page.id === pageId)
            },

            setCurrentPageByPath(state, { path }) {
              if(state.pages.all.length === 0) return null;
              state.pages.current = state.pages.all.find((page) => page.path === path)
            },

            setAreaData(state, areaData) {
                state.areaDataset = areaData
            },

            setSprints(state, sprints) {
              state.sprints = sprints
            },

            setSelectedSprint(state, selectedSprint) {
              localStorage.selectedSprint = JSON.stringify(selectedSprint);
              state.selectedSprint = selectedSprint;
            },

            setAssignees(state, assignees) {
              state.assignees = assignees
            },

            setSelectedAssignee(state, selectedAssignee) {
              localStorage.selectedAssignee = JSON.stringify(selectedAssignee);
              state.selectedAssignee = selectedAssignee;
            },

            setAllPages(state, areaNames) {
              const overviewPage = [{ id: 'overview', name: 'Overview', path: '/' }];
              const pages = Object.keys(areaNames)
                .filter(areaId => state.areaDataset.hasOwnProperty(areaId))
                .map((areaId) => {
                return {
                  id: areaId,
                  name: areaNames[areaId],
                  path: `/area/${areaId}`
                }
              });

              state.pages.all = overviewPage.concat(pages);
            },

            setCycleData(state, cycleData) {
              state.cycleData = cycleData;
            },

            toggleValidation(state) {
              state.validationEnabled = !state.validationEnabled;
              localStorage.validationEnabled = state.validationEnabled;
          }
        },

        actions: {
            changePage({ commit, state }, newPage) {
                commit('setCurrentPage', newPage)
                router.push({ path: state.pages.current.path })
            },

            async fetchSprint({ commit, dispatch }, selectedSprint) {
              commit('setSelectedSprint', selectedSprint);
              await dispatch('fetchAreaDataWithLoader');
            },

            async fetchAreaData({ state, commit }) {
                // const host = 'http://localhost:3131';
                const host = 'https://omega-data.gservice.emarsys.net';
                commit('clearError')
                try {
                    let url = `${host}/jira/overview`

                    if (state.selectedSprint) {
                      const query = `?sprintId=${state.selectedSprint.id}`;
                      url = url + query;
                    }
                    const response = await fetch(url);
                    const areaDataset = await response.json();
                    const sprints = areaDataset.sprints;
                    const stages = areaDataset.stages;
                    const cycleData = areaDataset.devCycleData;
                    const assignees = cycleData.assignees;
                    const areaData = calculateAreaData(cycleData);

                    commit('setAreaData', areaData);
                    commit('setAllPages', cycleData.area);
                    commit('setCycleData', cycleData);
                    commit('setCurrentPageByPath', router.currentRoute);
                    commit('setSprints', sprints);
                    commit('setSelectedSprint', cycleData.cycle);
                    commit('setStages', stages);

                    if (!state.selectedStage) {
                      commit('setSelectedStage', stages[0]);
                    }

                    commit('setAssignees', assignees);

                    if (!state.selectedAssignee) {
                      commit('setSelectedAssignee', assignees[0]);
                    }

                    const releaseFilters = [
                      { value: "all", name: "All Release Items", predicate: (epic) => true },
                      { value: "external", name: "Public / External Release Items", predicate: (epic) => epic.isExternal },
                      { value: "part-of-narrative", name: "Part of Release Narrative", predicate: (epic) => epic.isPartOfReleaseNarrative },
                      { value: "at-risk", name: "Release at Risk", predicate: (epic) => epic.isReleaseAtRisk },
                    ];
                    commit('setReleaseFilters', releaseFilters);

                    if(!state.selectedReleaseFilter) {
                      commit('setSelectedReleaseFilter', releaseFilters[0]); 
                    }

                } catch (e) {
                    console.error('Error on loading Area data', e)
                    commit('setError', 'Error :(')
                }
            },

            async fetchAreaDataWithLoader({ commit, dispatch }) {
                commit('loadingOn')
                await dispatch('fetchAreaData')
                commit('loadingOff')
            }
        }
    })

    router.onReady(() => {
        store.commit('setCurrentPageByPath', router.currentRoute)
    })

    return store
}
