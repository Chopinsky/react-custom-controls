import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';
import { SelectionList } from '../src/index'

const items = ["test item 1", "test item 2", "test item 3"].map((name) => {
  return {
    id: window.btoa(name),
    name: name,
    icon: ''
  }
})

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Selection List', module)
  .add('default', () => <SelectionList onItemClicked={action('clicked')} data={items} />)
