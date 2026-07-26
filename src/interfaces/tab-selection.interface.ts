interface ITabSelection {
  readonly selectedIndex: number;
  readonly onIndexChange: (index: number) => void;
}

export type { ITabSelection };
