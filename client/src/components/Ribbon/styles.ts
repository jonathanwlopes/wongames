import styled, { css, DefaultTheme } from 'styled-components'
import { darken } from 'polished'

import { RibbonColors, RibbonProps } from '.'

const wrapperModifiers = {
  color: (theme: DefaultTheme, color: RibbonColors) => css`
    background-color: ${theme.colors[color]};

    &::before {
      border-left-color: ${darken(0.2, theme.colors[color])};
      border-top-color: ${darken(0.2, theme.colors[color])};
    }
  `,

  medium: (theme: DefaultTheme) => css`
    height: 3.4rem;
    font-size: ${theme.font.sizes.medium};
    right: -2rem;
    padding: 0 ${theme.spacings.small};

    &::before {
      top: 3.4rem;
      border-top-width: 1rem;
      border-right-width: 2rem;
    }
  `,

  large: (theme: DefaultTheme) => css`
    height: 4rem;
    font-size: ${theme.font.sizes.large};
    right: -2rem;
    padding: 0 ${theme.spacings.small};

    &::before {
      top: 4rem;
      border-top-width: 1rem;
      border-right-width: 2rem;
    }
  `,

  small: (theme: DefaultTheme) => css`
    height: 2.4rem;
    font-size: ${theme.font.sizes.small};
    right: -2rem;
    padding: 0 ${theme.spacings.xxsmall};

    &::before {
      top: 2.4rem;
      border-top-width: 1rem;
      border-right-width: 2rem;
    }
  `
}

export const Wrapper = styled.div<Omit<RibbonProps, 'children'>>`
  ${({ theme, color, size }) => css`
    position: absolute;
    top: ${theme.spacings.xxsmall};
    display: flex;
    align-items: center;
    font-weight: ${theme.font.bold};
    color: ${theme.colors.white};

    &::before {
      content: '';
      position: absolute;
      right: 0;
      border-style: solid;
      border-left-width: 0;
      border-right-color: transparent;
      border-bottom-color: transparent;
      border-bottom-width: 1rem;
    }

    ${!!color && wrapperModifiers.color(theme, color)}
    ${!!size && wrapperModifiers[size](theme)}
  `}
`
