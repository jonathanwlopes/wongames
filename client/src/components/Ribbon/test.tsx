import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Ribbon from '.'

describe('<Ribbon />', () => {
  it('should render the text correctly', () => {
    renderWithTheme(<Ribbon>New Release</Ribbon>)

    expect(screen.getByText(/new release/i)).toBeInTheDocument()
  })

  it('should render with the primary color', () => {
    renderWithTheme(<Ribbon>New Release</Ribbon>)

    expect(screen.getByText(/new release/i)).toHaveStyle({
      backgroundColor: '#F231A5'
    })
  })

  it('should render with the secondary color', () => {
    renderWithTheme(<Ribbon color="secondary">New Release</Ribbon>)

    expect(screen.getByText(/new release/i)).toHaveStyle({
      backgroundColor: '#3CD3C1'
    })
  })

  it('should render medium size as default', () => {
    renderWithTheme(<Ribbon>New Release</Ribbon>)

    expect(screen.getByText(/new release/i)).toHaveStyle({
      height: '3.4rem',
      fontSize: '1.6rem'
    })
  })

  it('should render small size', () => {
    renderWithTheme(<Ribbon size="small">New Release</Ribbon>)

    expect(screen.getByText(/new release/i)).toHaveStyle({
      height: '2.4rem',
      fontSize: '1.4rem'
    })
  })

  it('should render large size', () => {
    renderWithTheme(<Ribbon size="large">New Release</Ribbon>)

    expect(screen.getByText(/new release/i)).toHaveStyle({
      height: '4rem',
      fontSize: '1.8rem'
    })
  })
})
