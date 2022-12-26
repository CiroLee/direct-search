<template>
  <div class="direct-search__modal">
    <div class="direct-search__modal--header">
      <div class="direct-search__modal--close" @click="handleClose">
        <i class="ri-close-fill"></i>
        <span>(Esc)</span>
      </div>
      <h4 class="direct-search__modal--title">使用方法</h4>
    </div>
    <div class="direct-search__modal--content">
      <p>[引擎标识缩写/英文全称] [搜索词]</p>
      <p>
        <span>e.g. go koa</span>
        <span class="gray indent-2"> // 打开新tab, 使用google搜索 koa</span>
      </p>
      <p>已支持的搜索引擎:</p>
      <ul>
        <li v-for="item in sortedSearchEngineMap" :key="item.name">
          <span>{{ item.name }}{{ item?.cname ? `(${item.cname})` : '' }}</span>
          <span>{{ item.abbr.join(' | ') }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { searchEngineMap } from '../search';
const sortedSearchEngineMap = computed(() =>
  searchEngineMap.sort((a, b) => {
    const aVal = a.name.toLowerCase();
    const bVal = b.name.toLowerCase();
    if (aVal > bVal) {
      return 1;
    } else if (aVal < bVal) {
      return -1;
    }
    return 0;
  }),
);
const emits = defineEmits(['close']);
const handleClose = () => {
  emits('close');
};
</script>
<style lang="scss" scoped>
.direct-search__modal {
  width: 94%;
  max-width: 550px;
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 24px 32px;
  background-color: var(--modal-bg-color);
  backdrop-filter: blur(4px);
  border-radius: 6px;
  border: 1px solid rgb(1 23 66 / 10%);
  transform: translate(-50%, -50%);
  z-index: 100;
  color: var(--color);
  &--header {
    position: absolute;
    width: calc(100% - 64px);
  }
  &--close {
    font-size: 18px;
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: var(--color);
    span {
      font-size: 14px;
      margin-top: -0.15em;
    }
  }
  &--title {
    font-size: 20px;
  }
  &--content {
    margin-top: 44px;
    color: #333;
    max-height: 60vh;
    overflow: auto;
    ul,
    p {
      margin-top: 8px;
      color: var(--color);
    }
    li {
      padding: 0 24px 0 12px;
      display: flex;
      color: var(--color);
      span:nth-of-type(1) {
        flex: 2;
      }
    }
  }
}
</style>
