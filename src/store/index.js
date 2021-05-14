import Vuex from 'vuex'
import { areaOrderInBackend } from '../config/pages'
import AreaData from '../libraries/areaData'
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
            isJiraEnabled: true,
            onlyExternal: false,
            selectedStage: {
              name: 'All Stages', value: 'all'
            },

            cycleData: null,
            areaDataset: null
        },
        getters: {
            currentAreaData(state) {
                if (!state.cycleData) return null;
                const areaId = state.pages.current.id;

                const predicates = [];
                if(state.onlyExternal) {
                  predicates.push((epic) => epic.isExternal);
                }

              if(state.selectedStage.value !== 'all') {
                predicates.push((epic) => epic.stage === state.selectedStage.value);
              }

              const epicFilter = (epic) => predicates.every((predicate) => predicate(epic));
              return calculateAreaData(state.cycleData, epicFilter)[areaId];
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

            setOnlyExternal(state, onlyExternal) {
              state.onlyExternal = onlyExternal;
            },

            setSelectedStage(state, stage) {
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
                      const areaData = calculateAreaData(cycleData);

                      commit('setAreaData', areaData);
                      commit('setAllPages', cycleData.area);
                      commit('setCycleData', cycleData);
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
