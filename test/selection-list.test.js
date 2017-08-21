import React from 'react';
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import { SelectionList } from '../src/index';

describe("Selection List", () => {
  let props;
  let mountedComponent;

  const selList = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <SelectionList {...props} />
      );
    }

    return mountedComponent;
  }

  beforeEach(() => {
    jasmineEnzyme();
    props = {
      data: [{ id: "1", name: "test item 1" }],
      selectionClassName: undefined,
      controlClassName: undefined,
      selectFirst: undefined
    };
    mountedLockScreen = undefined;
  });

  // All tests will go here
  it("always renders a div with correct structure", () => {
    const divs = lockScreen().find("div");
    const wrappingDiv = divs.first();

    expect(divs.length).toBeGreaterThan(0);
    expect(wrappingDiv.children()).toEqual(lockScreen().children());
  });
});
