import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'


describe('Blog component & buttons tests', () => {

  test('<Blog> initially renders title and author, but not url and likes', () => {
    const blog = {
      title: 'testing just got a lot harder',
      author: 'jestPoppa',
      url: 'fuckTests.net',
      user: '5fbbb7bc9913156ae3911b59'
    }

    const component = render(
      <Blog blog={blog}></Blog>
    )
    //component.debug()
    const preview = component.container.querySelector('.previewBlog')
    const afterview = component.container.querySelector('.completeBlog')

    expect(preview).toBeDefined()
    expect(afterview).toBe(null)
 
    expect(component.container).toHaveTextContent(blog.title, blog.author)
  })


})

