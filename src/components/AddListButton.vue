<template>
    <div class="d-inline mx-1">
        <div class="card add-list-btn-parent" @click.prevent="add()">
            <div class="card-body add-list-btn p-2">
                <div class="inline-block">
                    <IosAddIcon></IosAddIcon> Add a list
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import IosAddIcon from 'vue-ionicons/dist/ios-add.vue'

export default defineComponent({

    components: {
        IosAddIcon
    },

    setup() {

        function add() {
            this.$emit('add')
        }
        
        return {
            add
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
div.ion {
    display: inline-block;
}

div.add-list-btn-parent {
    background-color: rgba(0,0,0,.08);
    border-radius: 3px;
    transition: background 85ms ease-in,opacity 40ms ease-in,border-color 85ms ease-in;
}

div.add-list-btn-parent:hover {
    background-color: rgba(0,0,0,.16);
    cursor: pointer;
}
</style>