<template>
  <div>
    <virtualScroll :list="list"></virtualScroll>
  </div>
</template>

<script>
import virtualScroll from "@/components/virtualScroll/virtualScroll";

export default {
  data() {
    return {
      list: [],
    }
  },
  components: {
    virtualScroll,
  },
  mounted() {
    let list = [];
    for (let index = 0; index < 10000; index++) {
      list.push(index);
    }
    this.list = list
  },
};
</script>

<style>
</style>