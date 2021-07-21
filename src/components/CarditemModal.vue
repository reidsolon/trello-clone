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
                <div class="modal-body row">
                    <div class="col-md-9 col-12">
                        <div class="row">
                            <div class="col-1">
                                <IosListIcon></IosListIcon>
                            </div>
                            <div class="col-11">
                                <h6>Description</h6>
                                <a href="javascript:void(0)" class="fake-text-area pb-5" @click="edit()" v-if="!editting">
                                    <template v-if="info.description">
                                        {{ info.description }}
                                    </template>
                                    <template v-else>
                                        Add more detailed description...
                                    </template>
                                </a>

                                <div class="editable" v-else>
                                    <textarea class="real-text-area" id="description_textarea" placeholder="Add more detailed description..." v-model="description"></textarea>
                                    
                                    <div class="actions my-2">
                                        <button class="btn btn-primary save-btn" @click.prevent="saveDescription()">
                                            Save
                                        </button>
                                        <button class="btn btn-default" @click.prevent="closeEdit()">
                                            <IosCloseIcon></IosCloseIcon>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 col-12">
                        <div class="pb-5">
                            <h6>ADD TO CARD</h6>
                            
                            <div class="add-to-card-container">
                                <small>Nothing to show</small>
                            </div>
                        </div>

                        <div class="pb-5">
                            <h6>ACTIONS</h6>
                            <div class="actions-to-card-container">
                                <button class="add-to-card-btns" @click.prevent="archive()">
                                    <IosBriefcaseIcon></IosBriefcaseIcon> Archive
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import IosBriefcaseIcon from 'vue-ionicons/dist/ios-briefcase.vue'
import IosListIcon from 'vue-ionicons/dist/ios-list.vue'
import IosCloseIcon from 'vue-ionicons/dist/ios-close.vue'

const $ = require('jquery')

export default defineComponent({

    components: {
        IosBriefcaseIcon,
        IosListIcon,
        IosCloseIcon
    },

    props: {
        info: Object,
        index: Number,
        list: Object,
        listIndex: Number,
    },
    
    setup({listIndex, index, info}) {

        const editting = ref(false)

        const description = ref('')

        function archive() {

            $(`#${listIndex}_cardModalToggle${index}-modal`).modal('hide')

            this.$emit('archive')
        }

        function edit() {
            editting.value = true
        }

        function closeEdit() {
            description.value = info.description
            editting.value = false
        }

        function saveDescription() {
            this.$emit('saveDescription', {
                cardIndex: index,
                description: description.value
            })

            editting.value = false
        }

        onMounted(() => {
            description.value = info.description
        })
        
        return {
            archive,
            editting,
            edit,
            closeEdit,
            saveDescription,
            description
        }        
    },
})
</script>
<style scoped>

div.modal-dialog {
    background-color: #f4f5f7;
}
div.modal-header{
    border-bottom: unset !important;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
}

div.modal-footer {
    border-top: none;
}

button.add-to-card-btns {
    background-color: rgba(9,30,66,.04);
    box-shadow: none;
    border: none;
    border-radius: 3px;
    box-sizing: border-box;
    cursor: pointer;
    display: block;
    height: 32px;
    margin-top: 8px;
    width: 100%;
    max-width: 300px;
    overflow: hidden;
    padding: 6px 12px;
    position: relative;
    text-decoration: none;
    text-overflow: ellipsis;
    -webkit-user-select: none;
    text-align: left;
    user-select: none;
    color: #091e42;
    white-space: nowrap;
    transition-property: background-color,border-color,box-shadow;
    transition-duration: 85ms;
    transition-timing-function: ease;
}

button.add-to-card-btns:hover {
    color: #091e42;
    background-color: rgba(9,30,66,.08);
    box-shadow: none;
    border: none;
}

div.ion {
    display: inline-block;
}

a.fake-text-area {
    background-color: rgba(9,30,66,.04);
    box-shadow: none;
    color: #091e42;
    border: none;
    border-radius: 3px;
    display: block;
    min-height: 40px;
    padding: 8px 12px;
    text-decoration: none;
}

textarea.real-text-area {
    overflow: hidden;
    overflow-wrap: break-word;
    resize: none;
    height: 108px;
    min-height: 108px;
    background: #fff;
    box-shadow: none;
    display: block;
    padding: 8px 12px;
    width: 100%;
    border-color: rgba(9,30,66,.13);
}
</style>