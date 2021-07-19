<template>
    <div>
    </div>
</template>

<script>
import { defineComponent, onMounted } from '@vue/composition-api'

export default defineComponent({
    setup() {
        onMounted(() => {

            var element = document.createElement('script')
            element.type = 'text/javascript'
            element.src = 'https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js'
            element.setAttribute('data-name', 'bmc-button')
            element.setAttribute('data-slug', 'reidsolon')
            element.setAttribute('data-color', '#BD5FFF')
            element.setAttribute('data-emoji', '');
            element.setAttribute('data-font', 'Poppins')
            element.setAttribute('data-text', 'Paliti sad tawn kog kape oys')
            element.setAttribute('data-outline-color', '#000000')
            element.setAttribute('data-font-color', '#FFFFFF')
            element.setAttribute('data-coffee-color', '#FFDD00')

            document.body.append(element)

        })
    },
})
</script>
