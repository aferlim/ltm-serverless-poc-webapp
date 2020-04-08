import React from 'react'
import { render } from '@testing-library/react'
import TestPass from './TestPass'

test('renders learn react link', () => {
  const { getByText } = render(<TestPass />)
  const linkElement = getByText(/Simple Text/i)
  expect(linkElement).toBeInTheDocument()
})
