import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import * as S from './styles'

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = {
  size?: 'large' | 'medium' | 'small'
  fullWidth?: boolean
  icon?: React.ReactNode
  as?: React.ElementType
} & ButtonTypes

const Button = ({
  children,
  size = 'medium',
  fullWidth = false,
  icon,
  ...rest
}: ButtonProps) => (
  <S.Wrapper size={size} fullWidth={fullWidth} hasIcon={!!icon} {...rest}>
    {!!icon && icon}
    {!!children && <span>{children}</span>}
  </S.Wrapper>
)

export default Button
