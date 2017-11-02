import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';
import { SelectionList, FanOptions } from '../src/index'

const listItems = ["test item 1", "test item 2", "test item 3", "item 4"].map((name) => {
  return {
    id: window.btoa(name),
    name: name,
    icon: ''
  }
})

const fanButtons = ["btn1", "btn2", "btn3", "btn4", "btn5", "btn6"]

storiesOf('Welcome', module)
  .add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Selection List', module)
  .add('default', () => <SelectionList onItemClicked={action('clicked')} data={listItems} />)

storiesOf('Fan Options', module)
  .add('default', () =>
    <div>
      <FanOptions fanAngle="120" childButtons={fanButtons} />
    </div>
  )
