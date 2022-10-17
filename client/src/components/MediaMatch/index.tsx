import styled, { css } from 'styled-components'
import media, { DefaultBreakpoints } from 'styled-media-query'

type breakpoint = keyof DefaultBreakpoints

type MediaMatchProps = {
  greaterThan?: breakpoint
  lessThan?: breakpoint
}

const mediaMatchModifier = {
  lessThan: (size: breakpoint) => css`
    ${media.lessThan(size)`
      display: block;
    `}
  `,

  greaterThan: (size: breakpoint) => css`
    ${media.greaterThan(size)`
      display: block;
    `}
  `
}

const MediaMatch = styled.div<MediaMatchProps>`
  ${({ greaterThan, lessThan }) => css`
    display: none;

    ${!!greaterThan && mediaMatchModifier.greaterThan(greaterThan)};
    ${!!lessThan && mediaMatchModifier.lessThan(lessThan)};
  `}
`

export default MediaMatch
