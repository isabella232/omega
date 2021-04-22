import Vuex from 'vuex'
import { allPages, areaOrderInBackend } from '../config/pages'
import AreaData from '../libraries/areaData'


export default function createStore(router) {
    const store = new Vuex.Store({
        state: {
            loading: false,
            error: true,

            pages: {
                all: allPages,
                current: {}
            },
            isJiraEnabled: false,

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
                state.pages.current = state.pages.all.find((page) => page.id === pageId)
            },

            setCurrentPageByPath(state, { path, query }) {
              state.isJiraEnabled = !!query.jira;
              state.pages.current = state.pages.all.find((page) => page.path === path)
            },

            setAreaData(state, areaData) {
                state.areaDataset = areaData
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
                      let response = await fetch(`${host}/jira/overview`)
                      let areaDataset = await response.json()

                      let overview = new AreaData().applyData(areaDataset.devCycleData)

                      commit('setAreaData', { overview })
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
