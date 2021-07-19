<template>
    <div class="modal" :key="index + '_modal'" :id="`${listIndex}_cardModalToggle${index}-modal`" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header" v-if="list">
                    <h5 class="modal-title" id="exampleModalLabel">{{ info.title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body py-0">
                    <p>in list <u>{{ list.title }}</u></p>
                </div>
                <!-- <div class="modal-body">
                    <p>in list <u>{{ list.title }}</u></p>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({

    props: {
        info: Object,
        index: Number,
        list: Object,
        listIndex: Number,
    },
    
    setup() {
        
    },
})
</script>
<style scoped>
div.modal-header{
    border-bottom: unset !important;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
}

div.modal-footer {
    border-top: none;
}
</style>