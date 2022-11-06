import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Banner from '.'

const props = {
  title: 'Defy death',
  subtitle: '<p>Play the new <strong>CrashLands</strong> season<p>',
  img: 'https://picsum.photos/1042/580',
  buttonLabel: 'Buy now',
  buttonLink: '/games/defy-death'
}

describe('<Banner />', () => {
  it('should render correctly', () => {
    const { container } = renderWithTheme(<Banner {...props} />)

    expect(
      screen.getByRole('heading', { name: /defy death/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /play the new/i })
    ).toBeInTheDocument()

    expect(screen.getByRole('img', { name: /defy death/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
