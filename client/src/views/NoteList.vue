<template>
  <div class="note-list">
    <ul>
      <li v-if="res.length" v-for="(item, index) in res" :key="index" @click="goNoteDetail(item.id)">
        <div class="img">
          <img :src="item.head_img" alt="">
        </div>
        <div class="time">{{ item.m_time }}</div>
        <div class="title">{{ item.title }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import axios from '@/api/index.js';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
// 向后端请求某分类下的日记列表数据
const route = useRoute()
const router = useRouter()
const res = ref([])
axios.get('/findNoteListByType', {
  params: {
    note_type: route.query.title
  }
}).then(response => {
  res.value = response.data
  console.log(response.data);
})
  .catch(error => {
    console.error(error);
  });
const goNoteDetail = (id) => {
  router.push({ path: '/noteDetail', query: { id: id } })
}
</script>

<style lang="less" scoped>
.note-list {
  width: 100%;
  padding: 1rem 0.667rem 0;
  box-sizing: border-box;

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 50px;
    grid-row-gap: 30px;

    li {
      font-size: 0.37rem;

      img {
        width: 100%;
        height: 4rem;
        border-radius: 0.27rem;
      }

      .title {
        margin-top: 5px;
      }
    }
  }
}
</style>