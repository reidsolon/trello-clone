<template>
    <div>
        <div class="test p-2">
            <div class="list-details">
                <input type="text" v-model="title" placeholder="Enter list title" @keypress.enter.exact.prevent="save()" autofocus />
            </div>
            <button class="btn btn-primary save-btn" @click.prevent="save()">
                Add list
            </button>
            <button class="btn btn-default" @click.prevent="close()">
                <IosCloseIcon></IosCloseIcon>
            </button>
        </div>
    </div>
</template>
<script>

import IosCloseIcon from 'vue-ionicons/dist/ios-close.vue'
import { defineComponent, onMounted, ref } from '@vue/composition-api'

export default defineComponent({

    components: {
        IosCloseIcon
    },

    setup() {

        const title = ref('')

        function close() {

            title.value = ''

            this.$emit('close')

        }
        
        function save() {

            if(title.value == '') {
                return
            }

            this.$emit('save', title.value)

            title.value = ''
        }

        onMounted(() => {
            // console.log(root.$store)
        })

        return {
            title, save, close
        }

    },

})
</script>

<style scoped>

div.list-details {
    box-shadow: inset 0 0 0 2px #0079bf;
    overflow: hidden;
    padding: 2px 2px 2px;
    position: relative;
    z-index: 10;
    background-color: #fff;
    border-radius: 3px;
    /* box-shadow: 0 1px 0 rgb(9 30 66 / 25%); */
    cursor: pointer;
    display: block;
    margin-bottom: 8px;
    max-width: 300px;
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

input {
    width: 100%;
    border-color: transparent;
    outline: none;
}


div.test {
    width: 18rem;
    background-color: #ebecf0;
    border-radius: 3px;
    box-sizing: border-box;
    flex-direction: column;
    max-height: 100%;
    border: unset;
    position: relative;
    white-space: normal;
}

</style>