import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import GameCard from '.'

const props = {
  img: 'https://picsum.photos/293/137',
  title: 'Population Zero',
  developer: 'Gearbox Software',
  price: 'R$ 215,00'
}

describe('<GameCard />', () => {
  it('should render correctly', () => {
    renderWithTheme(<GameCard {...props} />)

    expect(screen.getByRole('img', { name: props.title })).toHaveAttribute(
      'src',
      'https://picsum.photos/293/137'
    )

    expect(
      screen.getByRole('heading', { name: props.title })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: props.developer })
    ).toBeInTheDocument()

    expect(screen.getByText(/R\$ 215,00/i)).toBeInTheDocument()

    expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument()
  })

  it('should render price in label', () => {
    renderWithTheme(<GameCard {...props} />)

    const price = screen.getByText(/215,00/i)

    expect(price).toBeInTheDocument()

    expect(price).not.toHaveStyle({
      'text-decoration': 'line-through'
    })

    expect(price).toHaveStyle({
      'background-color': '#3CD3C1'
    })
  })

  it('should render a line-through in price when promotional', () => {
    renderWithTheme(<GameCard {...props} promotionalPrice="R$ 15,00" />)

    const price = screen.getByText(/215,00/i)
    const promotionalPrice = screen.getByText(/R\$ 15,00/i)

    expect(price).toHaveStyle({
      'text-decoration': 'line-through'
    })

    expect(promotionalPrice).not.toHaveStyle({
      'text-decoration': 'line-through'
    })
  })

  it('should render a filled favorite icon when favorite is true', () => {
    renderWithTheme(<GameCard {...props} favorite />)

    const iconFilled = screen.getByLabelText(/remove from wishlist/i)

    expect(iconFilled).toBeInTheDocument()
  })

  it('should call onFav method when favorite is clicked', () => {
    const onFav = jest.fn()
    renderWithTheme(<GameCard {...props} favorite onFav={onFav} />)

    const favoriteIcon = screen.getAllByRole('button')[0]
    fireEvent.click(favoriteIcon)
    expect(onFav).toBeCalled()
  })

  it('should render a ribbon', () => {
    renderWithTheme(<GameCard {...props} ribbon="20% OFF" ribbonSize="small" />)

    expect(screen.getByText(/20% OFF/i)).toBeInTheDocument()
    expect(screen.getByText(/20% OFF/i)).toHaveStyle({
      height: '2.4rem',
      fontSize: '1.4rem'
    })
  })
})
