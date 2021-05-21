import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import ReduxApp from "../index";

it('renders login screen correctly', () => {
  const tree = renderer.create(<ReduxApp />).toJSON();
  expect(tree).toMatchSnapshot();
});

