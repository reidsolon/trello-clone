import { ref } from '@vue/composition-api'
import Vue from 'vue'
import Vuex from 'vuex'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(Vuex)
Vue.use(VueCompositionAPI)

export const store = new Vuex.Store({

    state: {
        useLocalStorage: ref(false),
        Lists: ref([]),
    },

    getters: {

        getCardsFromList: state => index => {

            try {

                return state.Lists.value[index]?.cards ? state.Lists.value[index]?.cards : []

            } catch (e) {

                console.log(e)

                return []
                
            }

        },

        getLists: state => {
            return state.Lists.value
        }

    },

    mutations: {

        ADD_LIST (state, value) {

            if(typeof value != 'object') {
                return
            }
            
            if(!('item' in value)) {
                return
            }

            try {

                value.item.cards = ref([])

                state.Lists.value.push(value.item)

            } catch(e) {
                console.log(e)
            }
        },

        UPDATE_LIST_TITLE (state, value) {
            if(typeof value != 'object') {
                return
            }

            try {

                state.Lists.value[value.index].title = value.title

            } catch(e) {
                console.log(e)
            }
        },  

        ARCHIVE_LIST (state, value) {
            if(typeof value != 'object') {
                return
            }

            try {
                state.Lists.value.splice(value.index, 1)
            } catch ( e ) {
                console.log(e)
            }
        },

        ARCHIVE_CARD (state, value) {
            try {
                state.Lists.value[value.listIndex]?.cards.value.splice(value.cardIndex, 1)
            } catch (e) {
                console.log(e)
            }
        },

        ADD_CARD (state, value) {

            if(typeof value != 'object') {
                return
            }

            if(!('index' in value)) {
                return
            }

            try {

                if(value.isPrepend) {
                    state.Lists.value[value.index].cards.value.unshift(value.item)
                } else {
                    state.Lists.value[value.index].cards.value.push(value.item)
                }


            } catch (e) {
                console.log(e)
            }
        },

        SAVE_CARD_DESCRIPTION(state, value) {

            try {

                state.Lists.value[value.listIndex].cards.value[value.cardIndex].description = value.description

            } catch( e ) {
                console.log(e)
            }
            
        }

    },

    actions: {

        addList({commit}, value) {
            commit('ADD_LIST', value)
        },

        updateListTitle({commit}, value) {
            commit('UPDATE_LIST_TITLE', value)
        },

        addCard({commit}, value) {
            commit('ADD_CARD', value)
        },

        archiveCard({commit}, value) {
            commit('ARCHIVE_CARD', value)
        },

        archiveList({commit}, value) {
            commit('ARCHIVE_LIST', value)
        },

        saveCardDescription({commit}, value) {
            commit('SAVE_CARD_DESCRIPTION', value)
        }

    }
})