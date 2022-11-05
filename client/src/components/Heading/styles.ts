import styled, { css, DefaultTheme } from 'styled-components'
import media from 'styled-media-query'
import { HeadingProps, LineColors } from '.'

const wrapperModifiers = {
  small: (theme: DefaultTheme) => css`
    font-size: ${theme.spacings.small};

    &::after {
      width: 3rem;
    }

    ${media.greaterThan('medium')`
      font-size: ${theme.spacings.xsmall};
    `};
  `,

  medium: (theme: DefaultTheme) => css`
    font-size: ${theme.spacings.medium};

    ${media.greaterThan('medium')`
      font-size: ${theme.spacings.small};
    `};
  `,

  large: (theme: DefaultTheme) => css`
    font-size: ${theme.spacings.large};

    ${media.greaterThan('medium')`
      font-size: ${theme.spacings.medium};
    `};
  `,

  lineLeft: (theme: DefaultTheme, lineColor: LineColors) => css`
    padding-left: ${theme.spacings.xxsmall};
    border-left: 0.7rem solid ${theme.colors[lineColor]};
  `,

  lineBottom: (theme: DefaultTheme, lineColor: LineColors) => css`
    position: relative;
    display: inline-block;
    margin-bottom: ${theme.spacings.medium};

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 5rem;
      border-bottom: 0.4rem solid ${theme.colors[lineColor]};
    }
  `
}

export const Wrapper = styled.h2<Omit<HeadingProps, 'children'>>`
  ${({ theme, color, lineLeft, lineBottom, lineColor, size }) => css`
    color: ${theme.colors[color!]};
    user-select: none;

    ${lineLeft && wrapperModifiers.lineLeft(theme, lineColor!)};
    ${lineBottom && wrapperModifiers.lineBottom(theme, lineColor!)};
    ${!!size && wrapperModifiers[size](theme)}
  `}
`
