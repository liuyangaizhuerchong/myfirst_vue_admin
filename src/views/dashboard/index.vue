<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <div class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in list" :key="item.id">
            <img :src="item.coverImage | dalImg" alt="轮播图" />
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Swiper from 'swiper/swiper-bundle.min.js'
import 'swiper/swiper-bundle.min.css'
import { get } from '@/utils/request'
export default {
  name: 'Dashboard',
  data() {
    return {
      list: []
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  async mounted() {
    await get('/api/v1/banners').then((res) => {
      this.list = res.data
      this.$nextTick(() => {
        new Swiper('.swiper', {
          //direction: 'vertical', // 垂直切换选项
          loop: true, // 循环模式选项
          autoplay: true, // 自动播放
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination'
          },
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          // 如果需要滚动条
          scrollbar: {
            el: '.swiper-scrollbar'
          }
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 10px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.swiper-slide img {
  width: 100vw;
  height: 25vw;
}
</style>
