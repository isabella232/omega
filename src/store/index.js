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
            onlyExternal: false,
            selectedStage: {
              name: 'All Stages', value: 'all'
            },

            cycleData: null,
            areaDataset: null,
            sprints: [],
            selectedSprint: null
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

            setSprints(state, sprints) {
              state.sprints = sprints
            },

            setSelectedSprint(state, selectedSprint) {
              state.selectedSprint = selectedSprint;
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

            fetchSprint({ commit, dispatch }, selectedSprint) {
              commit('setSelectedSprint', selectedSprint);
              dispatch('fetchAreaDataWithLoader');
            },

            async fetchAreaData({ state, commit }) {
                // const host = 'http://localhost:3131';
                const host = 'https://omega-data.gservice.emarsys.net';
                commit('clearError')
                try {
                    const url = `${host}/jira/overview?sprintId=${state.selectedSprint.id}`
                    const response = await fetch(url)
                    const areaDataset = await response.json()
                    const cycleData = areaDataset.devCycleData;
                    const areaData = calculateAreaData(cycleData);

                    commit('setAreaData', areaData);
                    commit('setAllPages', cycleData.area);
                    commit('setCycleData', cycleData);
                    commit('setCurrentPageByPath', router.currentRoute);
                } catch (e) {
                    console.error('Error on loading Area data', e)
                    commit('setError', 'Error :(')
                }
            },

            async fetchAreaDataWithLoader({ commit, dispatch }) {
                commit('loadingOn')
                await dispatch('fetchAreaData')
                commit('loadingOff')
            },

            async fetchSprints({ commit, dispatch }) {
              // const host = 'http://localhost:3131';
              const host = 'https://omega-data.gservice.emarsys.net';
              commit('clearError')
              try {
                const url = `${host}/jira/sprints`
                const response = await fetch(url);
                const { sprints } = await response.json();

                commit('setSprints', sprints);
                commit('setSelectedSprint', sprints.find(s => s.state === 'active'));
                dispatch('fetchAreaDataWithLoader');
              } catch (e) {
                console.error('Error on loading sprints', e)
                commit('setError', 'Error :(')
              }
            }
        }
    })

    router.onReady(() => {
        store.commit('setCurrentPageByPath', router.currentRoute)
    })

    return store
}
