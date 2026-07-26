import { TabsIcon } from '../components/TabsIcon';
import { TabsLabel } from '../components/TabsLabel';
import { TabsTrigger } from '../components/TabsTrigger';
import type { ITabsComponent } from '../interfaces/tabs-component.interface';
import { createCompoundComponent } from '../utils';
import { TabsRoot } from './TabsRoot';

const Tabs: ITabsComponent = Object.assign(TabsRoot, {
  Trigger: TabsTrigger,
  Icon: TabsIcon,
  Label: TabsLabel,
});

const Root = createCompoundComponent('Root', TabsRoot);
const Trigger = createCompoundComponent('Trigger', TabsTrigger);
const Icon = createCompoundComponent('Icon', TabsIcon);
const Label = createCompoundComponent('Label', TabsLabel);
export { Tabs, Root, Label, Icon, Trigger };
