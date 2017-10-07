import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';
import { SelectionList, ExpandableOptions } from '../src/index'

const listItems = ["test item 1", "test item 2", "test item 3"].map((name) => {
  return {
    id: window.btoa(name),
    name: name,
    icon: ''
  }
})

storiesOf('Welcome', module)
  .add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Selection List', module)
  .add('default', () => <SelectionList onItemClicked={action('clicked')} data={listItems} />)

storiesOf('Expandable Options', module)
  .add('default', () => <ExpandableOptions />)
