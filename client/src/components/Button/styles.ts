import styled, { css, DefaultTheme } from 'styled-components'
import { ButtonProps } from '.'

type WrapperProps = {
  hasIcon: boolean
} & Pick<ButtonProps, 'size' | 'fullWidth'>

const wrapperModifier = {
  large: (theme: DefaultTheme) => css`
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xlarge};
    height: 5rem;
    font-size: ${theme.font.sizes.medium};
  `,

  medium: (theme: DefaultTheme) => css`
    padding: ${theme.spacings.xxsmall} ${theme.spacings.medium};
    height: 4rem;
    font-size: ${theme.font.sizes.small};
  `,

  small: (theme: DefaultTheme) => css`
    height: 3rem;
    font-size: ${theme.font.sizes.xsmall};
  `,

  fullWidth: () => css`
    width: 100%;
  `,

  withIcon: (theme: DefaultTheme) => css`
    svg {
      width: 2rem;

      & + span {
        margin-left: ${theme.spacings.xxsmall};
      }
    }
  `
}

export const Wrapper = styled.button<WrapperProps>`
  ${({ theme, size, fullWidth, hasIcon }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #ff5f5f 0%, #f062c0 50%);
    color: ${theme.colors.white};
    border: 0;
    border-radius: ${theme.border.radius};
    padding: ${theme.spacings.xxsmall};
    cursor: pointer;
    text-decoration: none;
    transition-duration: 0.3s;

    &:hover {
      background: linear-gradient(180deg, #e35565 0%, #d958a6 50%);
    }

    ${!!size && wrapperModifier[size](theme)}
    ${!!fullWidth && wrapperModifier.fullWidth}
    ${!!hasIcon && wrapperModifier.withIcon(theme)}
  `}
`
