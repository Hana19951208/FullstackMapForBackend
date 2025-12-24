
export enum TechCategory {
  FRAMEWORK = '应用框架',
  STYLING = '样式与UI',
  DATA = '数据与状态',
  INFRA = '部署与基建',
  BUILD = '构建工具',
  API = 'API与通讯'
}

export interface TechItem {
  id: string;
  name: string;
  category: TechCategory;
  coordinate: string;
  analogy: string;
  explanation: string;
  problem: string;      // 诞生背景
  predecessor: string;  // 前身
  successor: string;    // 后继/现状
  story: string;
  icon: string;
}

export interface SearchState {
  query: string;
  category: TechCategory | '全部';
}
