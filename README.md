# Cupertino Tabs

A native iOS segmented tab bar for React Native, built on `UISegmentedControl`.

## Installation

```sh
npm install react-native-cupertino-tabs react-native-nitro-modules
cd ios && pod install
```

`react-native-nitro-modules` is a required peer dependency. New architecture only.

## Usage

```tsx
import { useState } from 'react';
import * as Tabs from 'react-native-cupertino-tabs';

export default function Example() {
  const [tab, setTab] = useState('library');

  return (
    <Tabs.Root value={tab} onValueChange={setTab}>
      <Tabs.Trigger value="listen">
        <Tabs.Icon name="waveform" />
        <Tabs.Label>Listen</Tabs.Label>
      </Tabs.Trigger>
      <Tabs.Trigger value="library">
        <Tabs.Icon name="square.stack.fill" />
        <Tabs.Label>Library</Tabs.Label>
      </Tabs.Trigger>
      <Tabs.Trigger value="search">
        <Tabs.Icon name="magnifyingglass" />
        <Tabs.Label>Search</Tabs.Label>
      </Tabs.Trigger>
    </Tabs.Root>
  );
}
```

Both import styles work:

```tsx
import * as Tabs from 'react-native-cupertino-tabs'; // Tabs.Root, Tabs.Trigger, …
import { Tabs } from 'react-native-cupertino-tabs'; // Tabs, Tabs.Trigger, …
```

### Controlled and uncontrolled

```tsx
<Tabs.Root value={tab} onValueChange={setTab}>          {/* controlled */}
<Tabs.Root defaultValue="library" onValueChange={onTab}> {/* uncontrolled */}
```

A trigger's `value` defaults to its label text, then to its index — so `value` is optional when labels are unique.

## Components

### `<Tabs.Root>`

| Prop            | Type                                     | Description                                                   |
| --------------- | ---------------------------------------- | ------------------------------------------------------------- |
| `value`         | `string`                                 | Controlled selection, matched against each trigger's `value`. |
| `defaultValue`  | `string`                                 | Initial selection when uncontrolled.                          |
| `onValueChange` | `(value: string, index: number) => void` | Fired once the selection is committed.                        |
| `tabBarOptions` | `ITabBarOptions`                         | Appearance and behaviour. See below.                          |
| `style`         | `StyleProp<ViewStyle>`                   | Applied to the container.                                     |

### `<Tabs.Trigger>`

| Prop                 | Type      | Description                                                                    |
| -------------------- | --------- | ------------------------------------------------------------------------------ |
| `value`              | `string`  | Identifier reported by `onValueChange`. Defaults to the label, then the index. |
| `disabled`           | `boolean` | Renders the tab unselectable.                                                  |
| `accessibilityLabel` | `string`  | VoiceOver label. Defaults to the tab's text.                                   |

Children may be a `<Tabs.Icon>`, a `<Tabs.Label>`, or both. Bare text works as a shorthand:

```tsx
<Tabs.Trigger value="all">All</Tabs.Trigger>
```

### `<Tabs.Icon>`

| Prop               | Type                  | Description                                                                 |
| ------------------ | --------------------- | --------------------------------------------------------------------------- |
| `name`             | `string`              | SF Symbol name, e.g. `house.fill`. Wins over `source`.                      |
| `source`           | `ImageSourcePropType` | Bundled asset, `{ uri }`, or a Metro asset in dev.                          |
| `size`             | `number`              | Point size. Defaults to `tabBarOptions.iconSize` (17).                      |
| `color`            | `string`              | Pins this icon's color, replacing the active/inactive tint.                 |
| `weight`           | `TFontWeight`         | SF Symbol weight.                                                           |
| `width` / `height` | `number`              | Explicit box for a `source` icon. The missing one follows the aspect ratio. |
| `borderRadius`     | `number`              | Corner radius for a `source` icon. Half the height gives a circle.          |

Artwork is only recolored when `color` is set, so multicolor assets keep their own palette. A `source` icon fills its box and crops the overflow, like `resizeMode: "cover"`.

### `<Tabs.Label>`

| Prop    | Type                         | Description                                                                                  |
| ------- | ---------------------------- | -------------------------------------------------------------------------------------------- |
| `style` | `StyleProp<TTabsLabelStyle>` | `fontFamily`, `fontSize`, `fontWeight`, `fontStyle`, `letterSpacing`, `lineHeight`, `color`. |

Typography belongs to each label, the way it does on `<Text>` — two tabs can legitimately use different fonts. Setting `color` pins the label to that color, so it no longer changes with the selection.

Label `fontSize` never resizes the icon beside it; use `iconSize` or the icon's own `size` for that.

## `tabBarOptions`

| Option                             | Type                | Default                 | Description                                                          |
| ---------------------------------- | ------------------- | ----------------------- | -------------------------------------------------------------------- |
| `width`                            | `number`            | stretches to the parent | Fixed control width.                                                 |
| `height`                           | `number`            | `44` row, `56` column   | Fixed control height.                                                |
| `backgroundColor`                  | `string`            | system track            | Track color. `"transparent"` removes the native track entirely.      |
| `selectedBackgroundColor`          | `string`            | system pill             | Selection pill color. `"transparent"` is honored.                    |
| `cornerRadius`                     | `number`            | native shape            | Corner radius of the track.                                          |
| `activeTintColor`                  | `string`            | `label`                 | Icon and label color of the selected tab.                            |
| `inactiveTintColor`                | `string`            | `secondaryLabel`        | Icon and label color of the rest.                                    |
| `direction`                        | `'row' \| 'column'` | `'row'`                 | `row` puts the label beside the icon, `column` stacks it underneath. |
| `gap`                              | `number`            | `5` row, `3` column     | Space between a tab's icon and its label.                            |
| `iconSize`                         | `number`            | `17`                    | Point size for icons that set no `size` of their own.                |
| `apportionsSegmentWidthsByContent` | `boolean`           | `false`                 | Size segments to their content instead of splitting evenly.          |
| `hapticFeedback`                   | `boolean`           | `true`                  | Selection haptics.                                                   |

Colors accept `#rgb`, `#rrggbb`, `#rrggbbaa`, `rgb()`, `rgba()` and `transparent`.

```tsx
<Tabs.Root
  defaultValue="home"
  tabBarOptions={{
    direction: 'column',
    height: 56,
    iconSize: 22,
    backgroundColor: 'transparent',
    selectedBackgroundColor: '#ffffff',
    activeTintColor: '#000000',
    inactiveTintColor: '#8e8e93',
  }}
>
  {/* … */}
</Tabs.Root>
```

## Behaviour notes

**Selection is committed on release.** While a finger is down the pill follows it immediately, but the icon and label colors do not move until the gesture ends. Pressing the already-selected tab dims it for the duration of the press; pressing a different tab leaves the current one active until the selection is confirmed. Dragging across tabs and releasing commits wherever the finger lifts.

**Transparency.** `UISegmentedControl` has no API for a transparent track, and setting a background image drops the control onto a legacy appearance path where `selectedSegmentTintColor` stops working and the pill disappears. `backgroundColor: "transparent"` instead hides the track's own views, which keeps a transparent bar _and_ a tinted, animating pill.

**Dark mode.** Colors are resolved against the control's traits and redrawn when the appearance changes, so `label`/`secondaryLabel` defaults and dynamic colors follow the system theme.

**Column layout.** Tabs share one icon row and one label row so icons line up across tabs. A tab with no label centres its icon in the full height instead of reserving the label row.

## Platform support

| Platform            | Behaviour                                      |
| ------------------- | ---------------------------------------------- |
| iOS                 | Native `UISegmentedControl`.                   |
| Android / web / SSR | Renders an empty `View` of the requested size. |

The package wraps a UIKit control, so there is no Android implementation. The fallback keeps a shared codebase compiling and laying out; guard with `Platform.OS === 'ios'` where a tab bar is required.

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

Regenerate the Nitro bindings after editing `src/specs/CupertinoTabs.nitro.ts`:

```sh
yarn nitrogen
cd example/ios && pod install
```

`pod install` is also required whenever a native file is added or removed — the Pods project bakes in the file list.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
