interface ISearchEngine {
  name: string;
  cname?: string;
  abbr: string[];
  type: 'engine' | 'website' | 'video' | 'translate';
  searchUrl: string;
}

export type ITranslateEngine = 'google-translate' | 'baidu-translate' | 'deepl-translate';
export const searchEngineMap: ISearchEngine[] = [
  {
    name: 'baidu',
    cname: '百度',
    abbr: ['b', 'ba'],
    type: 'engine',
    searchUrl: 'https://baidu.com/s?wd=',
  },
  {
    name: 'baidukaifa',
    cname: '百度开发搜索',
    abbr: ['bk'],
    type: 'engine',
    searchUrl: 'https://kaifa.baidu.com/searchPage?wd=',
  },
  {
    name: 'google',
    cname: '谷歌',
    abbr: ['go'],
    type: 'engine',
    searchUrl: 'https://google.com/search?q=',
  },
  {
    name: 'being',
    cname: '必应',
    abbr: ['be'],
    type: 'engine',
    searchUrl: 'https://www.bing.com/search?q=',
  },
  {
    name: 'github',
    abbr: ['gi'],
    type: 'website',
    searchUrl: 'https://github.com/search?type=repositories&q=',
  },
  {
    name: 'stackoverflow',
    abbr: ['st'],
    type: 'website',
    searchUrl: 'https://stackoverflow.com/search?q=',
  },
  {
    name: 'npm',
    abbr: ['n'],
    type: 'website',
    searchUrl: 'https://www.npmjs.com/search?q=',
  },
  {
    name: 'caniuse',
    abbr: ['c', 'ciu'],
    type: 'website',
    searchUrl: 'https://caniuse.com/?search=',
  },
  {
    name: 'juejin',
    cname: '掘金',
    abbr: ['j', 'jue'],
    type: 'website',
    searchUrl: 'https://juejin.cn/search?query=',
  },
  {
    name: 'zhihu',
    cname: '知乎',
    abbr: ['z', 'zhi'],
    type: 'website',
    searchUrl: 'https://www.zhihu.com/search?type=content&q=',
  },
  {
    name: 'csdn',
    abbr: ['c', 'cs'],
    type: 'website',
    searchUrl: 'https://so.csdn.net/so/search?q=',
  },
  {
    name: 'segmentfault',
    cname: '思否',
    abbr: ['se', 'sf'],
    type: 'website',
    searchUrl: 'https://segmentfault.com/search?q=',
  },
  {
    name: 'youtube',
    cname: '油管',
    abbr: ['yt'],
    type: 'video',
    searchUrl: 'https://www.youtube.com/results?search_query=v',
  },
  {
    name: 'bilibili',
    cname: '哔哩哔哩',
    abbr: ['bi'],
    type: 'video',
    searchUrl: 'https://search.bilibili.com/all?keyword=',
  },
  {
    name: 'google-translate',
    cname: 'google翻译',
    abbr: ['gf'],
    type: 'translate',
    searchUrl: 'https://translate.google.com/?sl=',
  },
  {
    name: 'deepl-translate',
    type: 'translate',
    cname: 'deepl',
    abbr: ['dl'],
    searchUrl: 'https://www.deepl.com/translator#',
  },
  {
    name: 'baidu-translate',
    type: 'translate',
    cname: '百度翻译',
    abbr: ['bf'],
    searchUrl: 'https://fanyi.baidu.com/#',
  },
  {
    name: 'baidubaike',
    type: 'website',
    cname: '百度百科',
    abbr: ['bw'],
    searchUrl: 'https://baike.baidu.com/item/',
  },
  {
    name: 'wikipedia',
    type: 'website',
    cname: '维基百科',
    abbr: ['wi'],
    searchUrl: 'https://zh.wikipedia.org/wiki/',
  },
];

export const getEngineSymbol = (str: string): string => {
  const firstSpacePos = str.replace(/(^\s*)/g, '').indexOf(' ');
  return firstSpacePos > -1 ? str.substring(0, firstSpacePos) : '';
};

export const getEngineObj = (abbr: string): ISearchEngine | undefined => {
  return searchEngineMap.find((item) => item.abbr.includes(abbr) || item.name === abbr);
};

export const getQuery = (str: string, abbr: string): string => {
  return str.substring(abbr.length).trim().replace(/\s+/g, ' ');
};

export const isChineseContained = (str: string) => /[\u4E00-\u9FA5]+/.test(str);

export const isMobile = () => /Android|webOS|iPhone|iPad/i.test(navigator.userAgent);

export const isMac = () => /macintosh | mac os x/i.test(navigator.userAgent);
