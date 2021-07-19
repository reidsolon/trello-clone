<template>
  <div>
    <BuyMeCoffee></BuyMeCoffee>
    <div class="p-1 text-center" id="navbar">
      <img src="https://a.trellocdn.com/prgb/dist/images/header-logo-spirit.d947df93bc055849898e.gif" alt="" class="">
    </div>
    <div class="container-fluid" id="main">
      <div class="row">
        <div class="col-12">
          <div class="p-1 d-inline-flex" style="overflow: auto;">
            <List
              v-for="(item, index) in Lists"
              :key="index"
              :info="item"
              :index="index"
              @save_new_title="saveNewTitle"
            ></List>
            <AddListButton
              v-if="!isAdding"
              @add="adding()"
            ></AddListButton>
            <CreateList
              v-else
              @save="save"
              @close="closing()"
            >
            </CreateList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { defineComponent, ref } from '@vue/composition-api'

const BuyMeCoffee = () => import("./components/BuyMeCoffe.vue")

const List = () => import('./components/List.vue')

const Navbar = () => import('./components/Navbar.vue')

const AddListButton = () => import('./components/AddListButton.vue')

const CreateList = () => import('./components/CreateList.vue')

export default defineComponent({

    components: {
      List,
      Navbar,
      AddListButton,
      CreateList,
      BuyMeCoffee
    },

    setup() {

      const isAdding = ref(false)

      const Lists = ref([])

      function save(title) {

        Lists.value.push({
          title: title
        })

        console.log(Lists.value)

        isAdding.value = false

      }

      function adding() {

        isAdding.value = true

      }

      function closing() {

        isAdding.value = false

      }

      function saveNewTitle({index, title}) {

        try {
          Lists.value[index].title = title
        } catch ( e ) {
          console.log(e)
        }
      }
      
      return {
        adding, closing, isAdding, save, Lists, saveNewTitle
      }
      
    },
})
</script>
<style>

#navbar img {
  width: 80px;
  height: 16px;
  margin: 7px 0;
  position: relative;
  opacity: 0.5;
}

body {
  background-attachment: fixed;
  background-image: url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1280x1920/2ce2bd77514230de54f3f581d9d4f0e6/photo-1624201685597-299a6b3d5797.jpg);
  background-size: 100% 100%;
  height: 100vh;
  background-repeat: no-repeat;
}
</style>
