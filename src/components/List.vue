<template>
    <div>
        <div class="card p-2 mx-1">
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
                <div class="col dropright" style="text-align: right;" >
                    <div class="d-inline px-2 more dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true">
                        <IosMoreIcon></IosMoreIcon>
                    </div>
                    <div class="dropdown-menu">
                        <!-- Dropdown menu links -->
                    </div>
                </div>
            </div>

            <div class="card-body p-0 mt-2">
                <template v-for="(item, index) in Tasks">
                    <div :key="index" class="list-details">
                        {{ item.name }}
                    </div>
                </template>
                <EmptyCard v-if="isAdding"
                    @close="isAdding=false"
                    @save="saveCard"
                ></EmptyCard>
            </div>

            <div class="card-footer p-0 py-1" v-if="!isAdding" @click.prevent="addCard">
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

export default defineComponent({

    props: {
        info: Object,
        index: Number,
    },

    components: {
        IosMoreIcon,
        IosAddIcon,
        EmptyCard
    },

    setup({info, index}) {

        const newTitle = ref('')

        const isAdding = ref(false)

        const Tasks = ref([])

        const editTitle = ref(false)

        function saveCard(title) {
            Tasks.value.push({
                name: title,
            })
            isAdding.value = false
        }

        function addCard() {
            isAdding.value = true
        }

        function saveEditTitle() {
            this.$emit('save_new_title', {
                title: newTitle.value,
                index: index
            })

            editTitle.value = false
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
            saveEditTitle
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>