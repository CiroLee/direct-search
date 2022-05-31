interface ISearchEngine {
  name: string;
  abbr: string[];
  type: 'engine' | 'website';
  searchUrl: string;
}
export const searchEngineMap: ISearchEngine[] = [
  {
    name: 'baidu',
    abbr: ['b'],
    type: 'engine',
    searchUrl: 'https://baidu.com/s?wd=',
  },
  {
    name: 'google',
    abbr: ['go'],
    type: 'engine',
    searchUrl: 'https://google.com/search?q=',
  },
  {
    name: 'github',
    abbr: ['gi'],
    type: 'website',
    searchUrl: 'https://github.com/search?q=',
  },
  {
    name: 'stackoverflow',
    abbr: ['st'],
    type: 'website',
    searchUrl: 'https://stackoverflow.com/search?q=',
  },
  {
    name: 'juejin',
    abbr: ['j', 'jue'],
    type: 'website',
    searchUrl: 'https://juejin.cn/search?query=',
  },
  {
    name: 'zhihu',
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
    abbr: ['se', 'sf'],
    type: 'website',
    searchUrl: 'https://segmentfault.com/search?q=',
  },
];

export const getEngineSymbol = (str: string): string => {
  const firstSpacePos = str.replace(/(^\s*)/g, '').indexOf(' ');
  return str.substring(0, firstSpacePos);
};

export const getEngineObj = (abbr: string): ISearchEngine | undefined => {
  return searchEngineMap.find(item => item.abbr.includes(abbr) || item.name === abbr);
};

export const getQuery = (str: string, abbr: string): string => {
  return str.substring(abbr.length).trim().replace(/\s+/g, '+');
};
