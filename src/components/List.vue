<template>
    <div>
        <div class="card p-2 mx-1">
            <div class="card-header row">
                <div class="col my-auto" v-if="info">
                    <h6>{{ info.title }}</h6>
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
import { defineComponent, ref } from '@vue/composition-api'

const EmptyCard = () => import('./EmptyCard.vue')

export default defineComponent({

    props: {
        info: Object
    },

    components: {
        IosMoreIcon,
        IosAddIcon,
        EmptyCard
    },

    setup() {

        const isAdding = ref(false)

        const Tasks = ref([])

        function saveCard(title) {
            Tasks.value.push({
                name: title,
            })
            isAdding.value = false
        }

        function addCard() {
            isAdding.value = true
        }

        return {
            isAdding,
            addCard,
            Tasks,
            saveCard
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
</style>