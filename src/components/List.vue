<template>
    <div>
        <div class="card p-2 mx-1" id="cardModalToggle">
            <div class="card-header row">
                <div class="col my-auto" v-if="info">
                    <transition name="fade">
                        <template v-if="!editTitle">
                            <h6 @click.prevent="editTitle=true">{{ info.title }}</h6>
                        </template>
                        <template v-else>
                            <div >
                                <input 
                                    type="text" 
                                    v-model="newTitle"  
                                    @blur.prevent="saveEditTitle()" 
                                    @keypress.enter.exact.prevent="saveEditTitle()"
                                    class="edit-title" 
                                    placeholder="Enter list title" 
                                    autofocus />
                            </div>
                        </template>
                    </transition>
                </div>
                <div class="col" style="text-align: right;" @click.prevent="openDropdown()">
                    <div class="d-inline px-2 more dropdown-toggle dropdown-toggle-split" :id="`${index}-list-dropdown`">
                        <IosMoreIcon></IosMoreIcon>
                    </div>
                    <div class="dropdown-menu show" v-if="isDropdown">
                        <div class="text-center">
                            <small>List Actions</small>
                        </div>
                        <div class="dropdown-divider px-1"></div>
                        <div class="text-left">
                            <a class="dropdown-item" @click="addCardAbove()" href="javascript:void(0)">Add card...</a>
                            <div class="dropdown-divider px-1"></div>
                            <a class="dropdown-item" @click="archiveList()" href="javascript:void(0)">Archive this list</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-body p-0 mt-2">
                <EmptyCard
                    :prepend="true"
                    v-if="isAddingAbove && !isAdding"
                    @close="isAdding=false;isAddingAbove=false"
                    @save-prepend="saveCardPrepend"
                ></EmptyCard>
                <template v-for="(item, idx) in info.cards.value">
                    <ListCard :key="idx" :info="item" :index="idx" :listIndex="index">
                    </ListCard>
                    <CardItemModal
                        :key="idx+'_modal'"
                        :info="item"
                        :index="idx"
                        :list="info"
                        :listIndex="index"
                        @archive="archiveCard(idx, index)"
                        @saveDescription="saveDescription"
                    ></CardItemModal>
                </template>
                <EmptyCard v-if="isAdding && !isAddingAbove"
                    @close="isAdding=false;isAddingAbove=false"
                    @save="saveCard"
                ></EmptyCard>
            </div>

            <div class="card-footer p-0 py-1" v-if="!isAdding && !isAddingAbove" @click.prevent="addCard">
                <div class="inline-block">
                    <IosAddIcon></IosAddIcon> Add a card
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import IosMoreIcon from 'vue-ionicons/dist/ios-more.vue'
import IosAddIcon from 'vue-ionicons/dist/ios-add.vue'
import { defineComponent, onMounted, ref } from '@vue/composition-api'

const EmptyCard = () => import('./EmptyCard.vue')

const ListCard = () => import('./ListCard.vue')

const CardItemModal = () => import('./CarditemModal.vue')

export default defineComponent({

    props: {
        info: Object,
        index: Number,
    },

    components: {
        IosMoreIcon,
        IosAddIcon,
        CardItemModal,
        EmptyCard,
        ListCard
    },

    setup({info, index}, {root}) {

        const newTitle = ref('')

        const isAddingAbove = ref(false)

        const isAdding = ref(false)

        const isDropdown = ref(false)

        const Tasks = ref([])

        const editTitle = ref(false)

        function saveCard(title) {

            root.$store.dispatch('addCard', {
                item: {
                    title: title,
                    description: ''
                },
                index: index
            })

            isAdding.value = false
            isAddingAbove.value = false
        }

        function saveCardPrepend(title) {
            root.$store.dispatch('addCard', {
                item: {
                    title: title,
                    description: ''
                },
                index: index,
                isPrepend: true,
            })
        }

        function addCard() {
            isAddingAbove.value = false
            isAdding.value = true
        }

        function addCardAbove() {
            isAdding.value = false
            isAddingAbove.value = true
        }

        function saveEditTitle() {
            this.$emit('save_new_title', {
                title: newTitle.value,
                index: index
            })

            editTitle.value = false
        }

        function openDropdown() {
            isDropdown.value = !isDropdown.value
        }

        function archiveList() {
            root.$store.dispatch('archiveList', {
                index: index,
            })
        }

        function archiveCard(cardIndex, listIndex) {
            root.$store.dispatch('archiveCard', {
                cardIndex: cardIndex,
                listIndex: listIndex,
            })
        }

        function saveDescription(description) {
            root.$store.dispatch('saveCardDescription', {
                listIndex: index,
                cardIndex: description.cardIndex,
                description: description.description
            })
        }

        onMounted(() => {
            newTitle.value = info.title
        })

        return {
            isAdding,
            addCard,
            Tasks,
            saveCard,
            editTitle,
            newTitle,
            saveEditTitle,
            openDropdown,
            isDropdown,
            addCardAbove,
            isAddingAbove,
            saveCardPrepend,
            archiveList,
            archiveCard,
            saveDescription
        }
        
    },
})
</script>
<style scoped>
div.card {
    width: 18rem;
    background-color: #ebecf0;
    border-radius: 3px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-height: 100%;
    border: unset;
    position: relative;
    white-space: normal;
}

div.card-body {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 70vh;
}

div.card-header {
    border-bottom: unset;
    background-color: unset;
    padding: unset;
}

div.card-footer {
    border-top: unset;
    background-color: unset;
    border-radius: 3px;
}

div.card-footer:hover {
    background-color: rgba(135, 136, 138, 0.08);
    color: #172b4d;
    cursor: pointer;
}

div.ion {
    display: inline-block;
}

div.card-header h1,
div.card-header h2,
div.card-header h3,
div.card-header h4,
div.card-header h5,
div.card-header h6 {
    font-weight: 600;
    margin: 0 0 8px;
    margin-bottom: unset;
    font-size: 80%;
}


div.list-details {
    overflow: hidden;
    padding: 6px 8px 2px;
    position: relative;
    z-index: 10;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
    cursor: pointer;
    display: block;
    margin-bottom: 8px;
    max-width: 300px;
    min-height: 20px;
    position: relative;
    text-decoration: none;
    z-index: 0;
}

div.col > .more:hover {
    background-color: rgba(9,30,66,.08);
    color: #172b4d;
    cursor: pointer;
}

div.list-details:hover {
    background-color: #f4f5f7;
    border-bottom-color: rgba(9,30,66,.25);
}

.dropdown-toggle::after {
    border-top: unset;
    border-right: unset;
    border-bottom: unset;
    border-left: unset;
}

input.edit-title {
    box-shadow: inset 0 0 0 2px #0079bf;
    overflow: hidden;
    position: relative;
    z-index: 10;
    background-color: #fff;
    border-radius: 3px;
    display: block;
    border-color: transparent;
    outline: none;
    margin-bottom: 8px;
    max-width: 300px;
    position: relative;
    text-decoration: none;
    z-index: 0;
}

div.dropdown-menu.show {
    background: #fff;
    border-radius: 3px;
    right: -270px;
    box-shadow: 0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
    overflow: hidden;
    position: absolute;
    width: 304px;
    z-index: 70;
    transform: translateZ(0);
}

div.dropdown-menu.show .dropdown-item {
    cursor: pointer;
    display: block;
    font-weight: 400;
    position: relative;
    text-decoration: none;
}
</style>