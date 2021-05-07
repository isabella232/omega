import Vuex from 'vuex'
import { areaOrderInBackend } from '../config/pages'
import AreaData from '../libraries/areaData'

const uniq = (list) => [...new Set(list)];

export default function createStore(router) {
    const store = new Vuex.Store({
        state: {
            loading: false,
            error: true,

            pages: {
                all: [],
                current: {}
            },
            isJiraEnabled: true,

            areaDataset: null
        },
        getters: {
            currentAreaData(state) {
                if (!state.areaDataset) return null
                return state.areaDataset[state.pages.current.id]
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
            }
        },

        actions: {
            changePage({ commit, state }, newPage) {
                commit('setCurrentPage', newPage)
                router.push({ path: state.pages.current.path })
            },

            async fetchAreaData({ state, commit }) {
                // const host = 'http://localhost:3131';
                const host = 'https://omega-data.gservice.emarsys.net';
                commit('clearError')
                try {
                    if(state.isJiraEnabled) {
                      const response = await fetch(`${host}/jira/overview`)
                      const areaDataset = await response.json()
                      const cycleData = areaDataset.devCycleData;

                      const overview = new AreaData().applyData(cycleData);

                      const areaData = { overview };
                      Object.keys(cycleData.area).forEach((area) => {
                        const areaObjectives = cycleData.objectives.map((objective) => {
                          const areaRelatedProjects = objective.projects.map((project) => {
                            return {
                              ...project,
                              epics: project.epics.filter(({ areaIds }) => areaIds.includes(area))
                            };
                          });

                          const projects = areaRelatedProjects.map((project) => {
                            const areaIds = project.epics.map(epic => epic.areaIds).flat();
                            const teams = project.epics.map(epic => epic.teams).flat();
                            return {
                              ...project,
                              crew: uniq(teams).join(', '),
                              area: uniq(areaIds).map(id => cycleData.area[id]).join(', ')
                            };
                          });

                          return {
                            ...objective,
                            projects: projects.filter(({ epics }) => epics.length !== 0)
                          };
                        });
                        const objectives = areaObjectives.filter(({ projects }) => projects.length !== 0);

                        if(objectives.length !== 0) {
                          areaData[area] = new AreaData().applyData({
                            cycle: cycleData.cycle,
                            objectives
                          });
                        }
                      })

                      commit('setAreaData', areaData);
                      commit('setAllPages', cycleData.area);
                      commit('setCurrentPageByPath', router.currentRoute);
                      return
                    }

                    let response = await fetch(`${host}/overview`)
                    let areaDataset = await response.json()

                    let areaData = {}

                    areaDataset.forEach((specificAreaData, i) => {
                        areaData[areaOrderInBackend[i]] = new AreaData().applyData(specificAreaData.devCycleData)
                    })

                    // Overview
                    let devCycleData = { cycle: areaDataset[0].devCycleData.cycle, objectives: [] };

                    //enhancing each project with area field
                    areaDataset = areaDataset.map((areaData, i) => {
                        areaData.devCycleData.objectives = areaData.devCycleData.objectives.map((objective) => {
                            objective.projects = objective.projects.map((project) => {
                                project.area = state.pages.all.find((page) => page.id === areaOrderInBackend[i]).name
                                return project
                            })

                            return objective
                        })

                        return areaData
                    });

                    //merge projects which belongs to different areas into the same objective
                    let areasObjectives = areaDataset.map((areaData) => areaData.devCycleData.objectives)
                    devCycleData.objectives = areasObjectives.reduce((acc, areaObjectives) => {
                        areaObjectives.forEach((areaObjective) => {
                            let indexInAcc = acc.findIndex((el) => el.objective === areaObjective.objective)
                            if (indexInAcc < 0) {
                                acc.push(areaObjective)
                            } else {
                                acc[indexInAcc].projects = acc[indexInAcc].projects.concat(areaObjective.projects)
                            }
                        });

                        return acc
                    }, [])

                    areaData.overview = new AreaData().applyData(devCycleData)

                    commit('setAreaData', areaData)
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
