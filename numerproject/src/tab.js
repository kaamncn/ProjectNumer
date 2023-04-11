import { Tabs } from '@mantine/core';
import { Route } from 'react-router-dom';
import Bisection from './code/rootEquation/bisection';
//import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';

const Tabmenu=(inputPage,graphPage,iterationPage)=> {
  return (
    <Tabs defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="input">Input</Tabs.Tab>
        <Tabs.Tab value="settings">Iteration</Tabs.Tab>
        <Tabs.Tab value="message">Graph</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="gallery" pt="xs">
        <Bisection/>
      </Tabs.Panel>

      <Tabs.Panel value="messages" pt="xs">
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value="settings" pt="xs">
        Settings tab content
      </Tabs.Panel>
    </Tabs>
  );
}
export default Tabmenu