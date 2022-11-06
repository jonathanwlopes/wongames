import { screen } from '@testing-library/react'
import { AddShoppingCart } from 'styled-icons/material'
import { renderWithTheme } from 'utils/tests/helpers'

import Button from '.'

describe('<Button />', () => {
  it('should render a medium size by default', () => {
    const { container } = renderWithTheme(<Button>Buy now</Button>)
    expect(screen.getByRole('button', { name: /Buy now/i })).toHaveStyle({
      height: '4rem',
      padding: '0.8rem 3.2rem',
      'font-size': '1.4rem'
    })

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render the large button', () => {
    renderWithTheme(<Button size="large" />)
    expect(screen.getByRole('button')).toHaveStyle({
      height: '5rem',
      padding: '0.8rem 4.8rem'
    })
  })

  it('should render the small button', () => {
    renderWithTheme(<Button size="small" />)
    expect(screen.getByRole('button')).toHaveStyle({
      height: '3rem'
    })
  })

  it('should render fullWidth button', () => {
    renderWithTheme(<Button fullWidth />)
    expect(screen.getByRole('button')).toHaveStyle({
      width: '100%'
    })
  })

  it('should render an icon version', () => {
    renderWithTheme(
      <Button icon={<AddShoppingCart data-testid="icon" />}>Buy Now</Button>
    )
    expect(screen.getByText(/Buy Now/)).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('should render a button has anchor element', () => {
    renderWithTheme(
      <Button as="a" href="/link">
        Buy Now
      </Button>
    )
    expect(screen.getByRole('link', { name: /buy now/i })).toHaveAttribute(
      'href',
      '/link'
    )
  })
})
