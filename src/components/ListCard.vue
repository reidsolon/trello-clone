<template>
    <div v-if="info" class="list-details" :id="`${listIndex}_cardModalToggle${index}`">
        {{ info.title }}
    </div>
</template>
<script>

import { defineComponent, onMounted } from '@vue/composition-api'

const $ = require('jquery')

export default defineComponent({

    props: {
        info: Object,
        index: Number,
        listIndex: Number,
    },

    setup({index, listIndex}) {
        onMounted(() => {
            $(`#${listIndex}_cardModalToggle${index}`).click(function() {

                $(`#${listIndex}_cardModalToggle${index}-modal`).modal('show')

                $(`button[data-dismiss="modal"]`).click(() => {
                    $(`#${listIndex}_cardModalToggle${index}-modal`).modal('hide')
                })
            })
        })
    },
})
</script>
<style scoped>
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
</style>