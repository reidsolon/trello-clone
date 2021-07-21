<template>
    <div class="mb-2">
        <div class="list-details">
            <textarea v-model="title" placeholder="Enter a title for this card." @keypress.enter.exact.prevent="save()" autofocus></textarea>
        </div>
        <button class="btn btn-primary save-btn" @click.prevent="save()">
            Add card
        </button>
        <button class="btn btn-default" @click.prevent="close()">
            <IosCloseIcon></IosCloseIcon>
        </button>
    </div>
</template>
<script>

import IosCloseIcon from 'vue-ionicons/dist/ios-close.vue'
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({

    props: {
        prepend: {
            required: false,
            default: false,
            type: Boolean,
        }
    },

    components: {
        IosCloseIcon
    },

    setup( {prepend} ) {

        const title = ref('')

        function close() {

            title.value = ''

            this.$emit('close')

        }
        
        function save() {

            if(title.value == '') {
                return
            }

            if(prepend) {
                this.$emit('save-prepend', title.value)
            } else {
                this.$emit('save', title.value)
            }


            title.value = ''
        }

        return {
            title, save, close
        }

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

button {
    box-shadow: unset;
    outline: none;
    border: none;
}

button.save-btn:hover {
    background-color: #026aa7;
    box-shadow: none;
    border: none;
    color: #fff;
}

textarea {
    width: 100%;
    border-color: transparent;
    outline: none;
}

</style>