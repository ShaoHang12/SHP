<template>
  <div>
    <Header />
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "app",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //通知Vuex发请求，提供数据，存储与仓库中
    this.$store.dispatch("categoryList");
  },
};
</script>
