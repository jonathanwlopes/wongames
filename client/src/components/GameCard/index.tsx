import {
  AddShoppingCart,
  FavoriteBorder,
  Favorite
} from '@styled-icons/material-outlined'

import Button from 'components/Button'
import Ribbon, { RibbonColors, RibbonSizes } from 'components/Ribbon'

import * as S from './styles'

export type GameCardProps = {
  title: string
  developer: string
  img: string
  price: string
  promotionalPrice?: string
  ribbon?: React.ReactNode
  ribbonSize?: RibbonSizes
  ribbonColor?: RibbonColors
  favorite?: boolean
  onFav?: () => void
}

const GameCard = ({
  title,
  developer,
  img,
  price,
  promotionalPrice,
  ribbon,
  ribbonSize = 'medium',
  ribbonColor = 'primary',
  favorite = false,
  onFav
}: GameCardProps) => (
  <S.Wrapper>
    {!!ribbon && (
      <Ribbon size={ribbonSize} color={ribbonColor}>
        {ribbon}
      </Ribbon>
    )}
    <S.ImageBox>
      <S.Image src={img} alt={title} />
    </S.ImageBox>
    <S.Content>
      <S.Info>
        <S.Title>{title}</S.Title>
        <S.Developer>{developer}</S.Developer>
      </S.Info>
      <S.FavButton role="button" onClick={onFav}>
        {!favorite && <FavoriteBorder aria-label="Add to Wishlist" />}
        {favorite && <Favorite aria-label="Remove from wishlist" />}
      </S.FavButton>
      <S.BuyBox>
        {!!promotionalPrice && <S.Price isPromotional>{price}</S.Price>}
        <S.Price>{promotionalPrice || price}</S.Price>
        <Button icon={<AddShoppingCart />} size="small" />
      </S.BuyBox>
    </S.Content>
  </S.Wrapper>
)

export default GameCard
