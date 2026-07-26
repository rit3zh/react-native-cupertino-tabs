const TABS_ROLE_KEY: unique symbol = Symbol.for(
  'react-native-cupertino-tabs.role'
);

const TABS_ROLE = {
  TRIGGER: 'trigger',
  ICON: 'icon',
  LABEL: 'label',
} as const;

export { TABS_ROLE_KEY, TABS_ROLE };
