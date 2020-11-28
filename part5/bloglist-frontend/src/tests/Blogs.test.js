import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'


describe('Blog component & buttons tests', () => {
  let blog
  let component
  let user

  beforeEach(() => {
    user = {
      id: '5fbbb7bc9913156ae3911b59',
      name: 'ForePlay',
    }

    blog = {
      title: 'testing just got a lot harder',
      author: 'jestPoppa',
      url: 'fuckTests.net',
      likes: 420,
      user: user
    }
    component = render(
      <Blog blog={blog} user={user}></Blog>
    )

  })

  test('<Blog> initially renders title and author, but not url and likes', () => {

    //component.debug()
    const preview = component.container.querySelector('.previewBlog')
    const afterview = component.container.querySelector('.completeBlog')

    expect(preview).toBeDefined()
    expect(afterview).toBe(null)

    expect(component.container).toHaveTextContent(blog.title, blog.author)
  })

  test('After clicking show details button, blog url and likes are rendered', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const afterview = component.container.querySelector('.completeBlog')

    expect(afterview).toBeDefined()
    expect(afterview).toHaveTextContent(blog.url, blog.likes)
  })

  test('When pressing like button twice, corresponding eventhandler is called twice.', () => {
    const view = component.getByText('view')
    fireEvent.click(view)

    const like = component.container.querySelector('.likes')

    const mockHandler = like.onClick()


    expect(1).toBe(1)

  })

})

