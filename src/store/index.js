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
                commit('loadingOn')

                try {
                    // let response = await fetch(`https://ems-omega-data.herokuapp.com/overview`)
                    let response = await fetch(`http://localhost:3131/overview`)
                    let areaDataset = await response.json()

                    let areaData = {}
                    areaDataset.forEach((specificAreaData, i) => {
                        areaData[areaOrderInBackend[i]] = new AreaData().applyData(specificAreaData.devCycleData)
                    })


                    // Overview
                    let devCycleData = { cycle: areaDataset[0].devCycleData, groups: [] };

                    areaDataset = areaDataset.map((areaData, i) => {
                        areaData.devCycleData.groups = areaData.devCycleData.groups.map((group) => {
                            group.projects = group.projects.map((project) => {
                                project.area = state.pages.all.find((page) => page.id === areaOrderInBackend[i]).name;
                                return project;
                            });

                            return group;
                        });

                        return areaData;
                    });

                    let areasGroups = areaDataset.map((areaData) => areaData.devCycleData.groups);
                    devCycleData.groups = areasGroups.reduce((acc, areaGroups) => {
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

                    areaData.overview = new AreaData().applyData(devCycleData);



                    commit('setAreaData', areaData)
                } catch (e) {
                    console.error('Error on loading Area data', e)
                    commit('setError', 'Error :(')
                }

                commit('loadingOff')
            }
        }
    })

    router.onReady(() => {
        store.commit('setCurrentPageByPath', router.currentRoute.path)
    })

    return store
}