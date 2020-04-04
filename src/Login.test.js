import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { useSelector } from 'react-redux'
import Login from './views/examples/Login'

jest.mock('react-redux')

describe('Should test the Login Component', () => {
  let container = null

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container)
    container.remove()
    container = null
  })

  it('show empty text when the login is empty', () => {
    const login = []
    useSelector.mockReturnValue(login)

    act(() => {
      render(<Login />, container)
    })

    container.querySelectorAll('li')
    expect(container.textContent).toBe('Todo list is empty')
  })

  it('should add one User to realtime db in the list', () => {
    const login = [
      {
        id: 'newUID',
        name: 'john smith',
        text: 'Houston, tx'
      }
    ]

    useSelector.mockReturnValue(login)
    act(() => {
      render(<Login />, container)
    })

    const listuser = container.querySelectorAll('authState')

    // this is not a real id, so only text which can be visible is Delete
    expect(login[0].textContent).toBe('Delete')
  })
})
