import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';
import { prettyDOM } from '@testing-library/dom';

test('renders content', () => {
  const blog = {
    author: 'me',
    url: 'none',
    likes: '1000000 likes',
    title: 'Component testing is done with react-testing-library',
  };

  const component = render(<Blog blog={blog} />);

  // component.debug();

  expect(component.container).toHaveTextContent('1000000 likes');

  const div = component.container.querySelector('.blog');
  expect(div).toHaveTextContent('1000000 likes');
  // console.log(prettyDOM(div));
  const element = component.getByText('1000000 likes');
  expect(element).toBeDefined();
});

test('clicking the button calls event handler once', () => {
  const blog = {
    author: 'me',
    url: 'none',
    likes: '1000000 likes',
    title: 'Component testing is done with react-testing-library',
  };

  const mockHandler = jest.fn();

  const component = render(<Blog blog={blog} moreLikes={mockHandler} />);

  const button = component.getByText('like this post');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
