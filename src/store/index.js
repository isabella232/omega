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

            areaDataset: null
        },
        getters: {
            currentAreaData(state) {
                if (!state.areaDataset) return null
                return state.areaDataset[state.pages.current.id]
            },

            isOverviewPage(state) {
                return state.pages.current.id === 'overview';
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

            setCurrentPageByPath(state, path) {
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
                commit('clearError')

                try {
                    let response = await fetch(`https://ems-omega-data.herokuapp.com/overview`)
                    // let response = await fetch(`http://localhost:3131/overview`)
                    let areaDataset = await response.json()

                    let areaData = {}
                    areaDataset.forEach((specificAreaData, i) => {
                        areaData[areaOrderInBackend[i]] = new AreaData().applyData(specificAreaData.devCycleData)
                    })


                    // Overview
                    let devCycleData = { cycle: areaDataset[0].devCycleData.cycle, objectives: [] };

                    areaDataset = areaDataset.map((areaData, i) => {
                        areaData.devCycleData.objectives = areaData.devCycleData.objectives.map((objective) => {
                            objective.projects = objective.projects.map((project) => {
                                project.area = state.pages.all.find((page) => page.id === areaOrderInBackend[i]).name;
                                return project;
                            });

                            return objective;
                        });

                        return areaData;
                    });

                    let areasObjectives = areaDataset.map((areaData) => areaData.devCycleData.objectives);
                    devCycleData.objectives = areasObjectives.reduce((acc, areaObjectives) => {
                        areaObjectives.forEach((areaObjective) => {
                            let indexInAcc = acc.findIndex((el) => el.objective === areaObjective.objective);
                            if (indexInAcc < 0) {
                                acc.push(areaObjective);
                            } else {
                                acc[indexInAcc].projects = acc[indexInAcc].projects.concat(areaObjective.projects);
                            }
                        });

                        return acc;
                    }, []);

                    areaData.overview = new AreaData().applyData(devCycleData);

                    commit('setAreaData', areaData)
                } catch (e) {
                    console.error('Error on loading Area data', e)
                    commit('setError', 'Error :(')
                }
            },

            async fetchAreaDataWithLoader({ commit, dispatch }) {                
                commit('loadingOn')
                await dispatch('fetchAreaData');
                commit('loadingOff')
            }
        }
    })

    router.onReady(() => {
        store.commit('setCurrentPageByPath', router.currentRoute.path)
    })

    return store
}