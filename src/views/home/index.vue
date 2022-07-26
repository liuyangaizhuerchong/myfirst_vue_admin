<template>
  <div class="home-container">
    <div class="home-text">
      <el-carousel :interval="4000" type="card" height="15vw">
        <el-carousel-item v-for="item in banner" :key="item.id">
          <img class="imgbanner" :src="item.coverImage | dalImg" alt="轮播图" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { get } from '@/utils/request'
export default {
  name: 'Home',
  data() {
    return {
      banner: {}
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  async mounted() {
    const res = await get('/api/v1/banners')
    this.banner = res.data
  }
}
</script>

<style lang="scss" scoped>
.home {
  &-container {
    margin: 10px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.imgbanner {
  width: 100%;
  height: 100%;
}
</style>
