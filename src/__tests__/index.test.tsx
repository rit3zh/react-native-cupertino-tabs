import { describe, expect, it } from '@jest/globals';
import { TABS_ROLE_KEY } from '../constants/role.constant';
import { Icon, Label, Root, Tabs, Trigger } from '../index';

describe('public API', () => {
  it('exposes the compound components off the root', () => {
    expect(typeof Tabs).toBe('function');
    expect(Tabs.Trigger).toBeDefined();
    expect(Tabs.Icon).toBeDefined();
    expect(Tabs.Label).toBeDefined();
  });

  it('exposes the same components as named exports', () => {
    expect(Root).toBeDefined();
    expect(Trigger).toBeDefined();
    expect(Icon).toBeDefined();
    expect(Label).toBeDefined();
  });

  it('brands the sub-components so children can be identified', () => {
    expect(TABS_ROLE_KEY).toBe(Symbol.for('react-native-cupertino-tabs.role'));

    expect(
      (Tabs.Trigger as unknown as Record<symbol, string>)[TABS_ROLE_KEY]
    ).toBe('trigger');
    expect(
      (Tabs.Icon as unknown as Record<symbol, string>)[TABS_ROLE_KEY]
    ).toBe('icon');
    expect(
      (Tabs.Label as unknown as Record<symbol, string>)[TABS_ROLE_KEY]
    ).toBe('label');
  });

  it('names the root for the React tree', () => {
    expect(typeof Tabs.displayName).toBe('string');
    expect(Tabs.displayName).toBeTruthy();
  });

  it('serves the root under both names from one component', () => {
    expect(Root).toBe(Tabs);
  });

  it('renders sub-components as nothing — they are descriptors', () => {
    expect(Tabs.Trigger({})).toBeNull();
    expect(Tabs.Icon({})).toBeNull();
    expect(Tabs.Label({})).toBeNull();
  });
});
