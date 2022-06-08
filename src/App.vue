<template>
  <div class="direct-search">
    <div class="direct-search__header">
      <a href="https://github.com/CiroLee/direct-search" target="_blank">
        <i class="ri-github-fill"></i>
        <span>Github</span>
      </a>
      <i class="direct-search__header--help ri-question-fill" @click="toggleModal(true)"></i>
    </div>
    <div class="direct-search__title"></div>
    <div class="direct-search__input">
      <i class="direct-search__input--logo" :class="engineName"></i>
      <input ref="inputRef" v-model="inputVal" type="text" @input="handleInput" @keyup.enter="handleSearch" />
      <i v-show="inputVal" class="direct-search__input--clear ri-close-fill" @click="handleClearInput"></i>
      <button class="icon direct-search__input--btn" :disabled="searchBtnDisabled" @click="handleSearch"></button>
    </div>
    <div v-if="showModal" class="direct-search__modal">
      <i class="ri-close-fill direct-search__modal--close" @click="toggleModal(false)"></i>
      <h4 class="direct-search__modal--title">使用方法</h4>
      <div class="direct-search__modal--content">
        <p>[引擎标识缩写/英文全称] [搜索词]</p>
        <p>
          <span>e.g. go vue和react</span>
          <span class="gray indent-2"> // 打开新tab, 实用google搜索 vue和react</span>
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
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { getEngineObj, getEngineSymbol, getQuery, searchEngineMap } from './search';
const inputRef = ref<HTMLInputElement | null>(null);
const inputVal = ref('');
const engineName = ref('baidu');
const searchUrl = ref('https://baidu.com/s?wd=');
const query = ref('');
const showModal = ref(false);
const searchBtnDisabled = computed(() => !query.value.length);
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
  })
);
const handleInput = () => {
  const engineAbbr = getEngineSymbol(inputVal.value);
  const engine = getEngineObj(engineAbbr);

  if (engine) {
    // 设置搜索引擎图标
    engineName.value = engine.name;
    searchUrl.value = engine.searchUrl;
  }
  // 获取搜索词
  query.value = getQuery(inputVal.value, engineAbbr);
};

const handleSearch = () => {
  query.value && window.open(`${searchUrl.value}${query.value}`, '_blank');
};

const handleClearInput = () => {
  inputVal.value = '';
  query.value = '';
  inputRef.value?.focus();
};

const toggleModal = (show: boolean): void => {
  showModal.value = show;
};
onMounted(() => {
  inputRef.value?.focus();
});
</script>
<style lang="scss" scoped>
.icon {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

ul,
li {
  list-style-type: none;
}

.direct-search {
  height: 100vh;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  align-items: center;
  background-color: #f0f5ff;
}

.direct-search__header {
  display: flex;
  width: 100%;
  height: 56px;
  padding: 0 24px;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  font-size: 18px;
  color: #333;
  a {
    position: relative;
    text-decoration: unset;
    display: inline-flex;
    align-items: center;
    height: 100%;
    font-size: 16px;
    color: inherit;
    i {
      font-size: 16px;
      margin-top: 2px;
      margin-right: 4px;
    }
  }
  &--help {
    margin-left: 12px;
    cursor: pointer;
  }
  &--help:hover,
  a:hover {
    color: #1a52ec;
  }
}

.direct-search__title {
  width: 220px;
  height: 70px;
  margin: 0 auto;
  margin-top: max(140px, 14%);
  background: url('./assets/img/title-img.png') center no-repeat;
  background-size: 100% auto;
}

.direct-search__input {
  width: 72%;
  margin: 24px auto;
  position: relative;
  &--logo {
    width: 28px;
    height: 28px;
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% auto;
    &.baidu {
      background-image: url('./assets/img/icons/baidu-icon.svg');
    }
    &.google {
      background-image: url('./assets/img/icons/google-icon.svg');
    }
    &.being {
      background-image: url('./assets/img/icons/being-icon.svg');
    }
    &.github {
      background-image: url('./assets/img/icons/github-icon.svg');
    }
    &.stackoverflow {
      background-image: url('./assets/img/icons/stackoverflow-icon.svg');
    }
    &.zhihu {
      background-image: url('./assets/img/icons/zhihu-icon.svg');
    }
    &.juejin {
      background-image: url('./assets/img/icons/juejin-icon.svg');
    }
    &.csdn {
      background-image: url('./assets/img/icons/csdn-icon.svg');
    }
    &.segmentfault {
      background-image: url('./assets/img/icons/segmentfault-icon.svg');
    }
    &.npm {
      background-image: url('./assets/img/icons/npm-icon.svg');
    }
    &.caniuse {
      background-image: url('./assets/img/icons/caniuse-icon.svg');
    }
    &.baidukaifa {
      background-image: url('./assets/img/icons/baidukaifa-icon.svg');
    }
  }
  &--clear {
    font-size: 22px;
    position: absolute;
    right: 48px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #5d5d5d;
  }
  &--btn {
    outline: 0;
    border: 0;
    background-color: transparent;
    right: 4px;
    top: 3px;
    cursor: pointer;
    position: absolute;
    &::before {
      content: '';
      width: 30px;
      height: 30px;
      display: block;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100% auto;
      background-image: url('./assets/img/icons/go-arrow-enable.svg');
    }
    &:disabled::before {
      background-image: url('./assets/img/icons/go-arrow-disabled.svg');
      cursor: not-allowed;
    }
  }
  input {
    width: 100%;
    outline: 0;
    border: 1px solid rgb(0 0 0 / 10%);
    border-radius: 52px;
    height: 52px;
    transition: all 0.25s ease;
    padding: 0 56px;
    font-size: 16px;
    color: rgb(0 0 0 / 80%);
    background-color: #f5f8ff;
    &:focus {
      border-color: #1a52ec;
    }
  }
}

.direct-search__modal {
  width: 94%;
  max-width: 550px;
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 24px 32px;
  background-color: rgb(240 245 255 / 80%);
  backdrop-filter: blur(4px);
  border-radius: 6px;
  border: 1px solid rgb(1 23 66 / 10%);
  transform: translate(-50%, -50%);
  z-index: 100;
  &--close {
    font-size: 18px;
    position: absolute;
    top: 24px;
    right: 32px;
    cursor: pointer;
    color: #b3afaf;
    &:hover {
      color: #000;
    }
  }
  &--title {
    font-size: 20px;
  }
  &--content {
    margin-top: 20px;
    color: #333;
    ul,
    p {
      margin-top: 8px;
    }
    li {
      padding-left: 12px;
      display: flex;
      justify-content: space-between;
      width: 50%;
      span {
        text-align: right;
      }
    }
  }
}

.indent-2 {
  display: inline-block;
  text-indent: 1em;
}

.gray {
  color: gray;
}
</style>
