<template>
  <div class="direct-search">
    <div class="direct-search__header">
      <i
        class="direct-search__header--darkMode"
        :class="isDark ? 'ri-moon-line' : 'ri-sun-line'"
        @click="toggleDarkMode"></i>
      <a href="https://github.com/CiroLee/direct-search" target="_blank">
        <i class="ri-github-fill"></i>
      </a>
      <i class="direct-search__header--help ri-question-fill" @click="toggleModal(true)"></i>
    </div>
    <div class="direct-search__title"></div>
    <div class="direct-search__input">
      <i class="direct-search__input--logo" :class="engineName"></i>
      <input
        ref="inputRef"
        v-model="inputVal"
        type="text"
        :placeholder="inputPlaceholder"
        @input="handleInput"
        @keyup.enter="handleSearch" />
      <i v-show="inputVal" class="direct-search__input--clear ri-close-fill" @click="handleClearInput"></i>
      <button class="icon direct-search__input--btn" :disabled="searchBtnDisabled" @click="handleSearch"></button>
    </div>
    <help-modal v-if="showModal" @close="toggleModal(false)" />
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, watchEffect } from 'vue';
import HelpModal from './components/helpModal.vue';
import { useDark, useEventListener } from '@src/hooks';
import { Storage } from 'mew-utils';
import {
  getEngineObj,
  getEngineSymbol,
  getQuery,
  isChineseContained,
  isMac,
  isMobile,
  ITranslateEngine,
} from './search';

const localDarkKey = 'color-scheme';
const isDark = useDark(localDarkKey);
const inputRef = ref<HTMLInputElement | null>(null);
const inputPlaceholder = ref('');
const inputVal = ref('');
const engineName = ref('baidukaifa');
const engineType = ref('');
const searchUrl = ref('https://kaifa.baidu.com/searchPage?wd=');
const query = ref('');
const showModal = ref(false);
const searchBtnDisabled = computed(() => !query.value.length);
const handleInput = () => {
  const engineAbbr = getEngineSymbol(inputVal.value);
  const engine = getEngineObj(engineAbbr);

  engineType.value = engine?.type || '';

  if (engine) {
    // 设置搜索引擎图标
    engineName.value = engine.name;
    searchUrl.value = engine.searchUrl;
  }
  // 获取搜索词
  query.value = getQuery(inputVal.value, engine ? engineAbbr : '');
};

const translateSiteMap = (engineType: string, query: string, isEn?: boolean) => {
  const siteMap = {
    'google-translate': isEn ? `en&tl=zh-CN&text=${query}` : `zh-CN&tl=en&text=${query}`,
    'deepl-translate': isEn ? `en/zh/${query}` : `zh/en/${query}`,
    'baidu-translate': isEn ? `en/zh/${query}` : `zh/en/${query}`,
  };

  return siteMap[engineType as ITranslateEngine];
};

const handleSearch = () => {
  if (engineType.value === 'translate') {
    const isAllEnglish = !isChineseContained(query.value);
    const transQuery = translateSiteMap(engineName.value, query.value, isAllEnglish);
    return transQuery && window.open(`${searchUrl.value}${transQuery}`, '_blank');
  }
  // 非翻译引擎
  return query.value && window.open(`${searchUrl.value}${encodeURI(query.value)}`, '_blank');
};

const handleClearInput = () => {
  inputVal.value = '';
  query.value = '';
  inputRef.value?.focus();
};

const toggleModal = (show: boolean): void => {
  showModal.value = show;
};
const renderInputPlaceholder = () => {
  const isMac = /macintosh | mac os x/i.test(navigator.userAgent);
  inputPlaceholder.value = isMac ? 'helper: ⌘ + k' : 'helper: control + k';
};
// 键盘事件监听 toggle帮助弹窗
const shortCutsHelper = (isMac: boolean): void => {
  let keys: string[] = [];

  function checkKeyArr() {
    if (keys.join('') === 'metak' || keys.join('') === 'controlk') {
      showModal.value = true;
    } else if (keys.length > 1) {
      keys.length = 0;
    }
  }

  useEventListener(document, 'keydown', function (event: KeyboardEvent | Event) {
    const eventKey = (event as KeyboardEvent).key;
    if (eventKey === 'Escape') {
      showModal.value = false;
      keys.length = 0;
      return;
    }

    if (isMac) {
      // macos: command + k
      if (keys.length === 0 && eventKey.toLowerCase() === 'meta') {
        keys.push(eventKey.toLowerCase());
      } else if (keys[0] === 'meta' && eventKey === 'k') {
        keys.push(eventKey.toLowerCase());
      }
    } else {
      // window: control + l
      if (eventKey.toLowerCase() === 'control') {
        keys.push(eventKey.toLowerCase());
      } else if (keys[0] === 'control' && eventKey === 'k') {
        keys.push(eventKey.toLowerCase());
      }
    }

    checkKeyArr();
  });
};
// dark模式切换对应的dom副作用
const darkModeEffect = (bool: boolean) => {
  if (bool) {
    document.body.classList.add('dark');
    document.body.classList.remove('light');
  } else {
    document.body.classList.remove('dark');
    document.body.classList.add('light');
  }
};
// 手动修改dark
const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  Storage.set(localDarkKey, isDark.value ? 'dark' : 'light', 12);
};

watchEffect(() => {
  darkModeEffect(isDark.value);
});

onMounted(() => {
  inputRef.value?.focus();
  if (!isMobile()) {
    renderInputPlaceholder();
    shortCutsHelper(isMac());
  }
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
  background-color: var(--bg-color);
}

.direct-search__header {
  display: flex;
  width: 100%;
  height: 56px;
  padding: 0 18px;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  font-size: 18px;
  color: var(--color);
  i {
    font-size: 22px;
    margin: 0 12px;
  }
  a {
    position: relative;
    text-decoration: unset;
    display: inline-flex;
    align-items: center;
    height: 100%;
    font-size: 16px;
    color: inherit;
  }
  &--darkMode,
  &--help {
    cursor: pointer;
  }
  &--darkMode:hover,
  &--help:hover,
  a:hover {
    color: var(--hover-color);
  }
}

.direct-search__title {
  width: 220px;
  height: 70px;
  margin: max(140px, 14%) auto 0;
  background: var(--title-img) center no-repeat;
  background-size: 100% auto;
}

.direct-search__input {
  width: 52%;
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
    &.baidu-translate,
    &.baidubaike,
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
    &.youtube {
      background-image: url('./assets/img/icons/youtube-fill.svg');
    }
    &.bilibili {
      background-image: url('./assets/img/icons/bilibili-fill.svg');
    }
    &.google-translate {
      background-image: url('./assets/img/icons/google-translate-icon.svg');
    }
    &.deepl-translate {
      background-image: url('./assets/img/icons/deepl-icon.svg');
    }
    &.wikipedia {
      background-image: url('./assets/img/icons/wikipedia-icon.svg');
    }
    &.fsou {
      background-image: url('./assets/img/icons/f-sou.svg');
    }
  }
  &--clear {
    font-size: 22px;
    position: absolute;
    right: 48px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: var(--clear-color);
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
    background-color: var(--input-bg-color);
    color: var(--color);
    &:focus {
      border-color: var(--input-focus-border-color);
    }
    &::placeholder {
      color: rgb(190 190 190);
    }
  }
}

@media screen and (max-width: 414px) {
  .direct-search__input {
    width: 86%;
  }
}

/* safari use dvh */
@supports (-webkit-touch-callout: none) {
  .direct-search {
    height: 100dvh;
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
