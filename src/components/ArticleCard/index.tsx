import styled, { css } from 'styled-components'
import { transparentize } from 'polished'
import { ArticleStats, ProfileName } from '@/components'

export type ArticleCardProps = {
  title: string
  description: string
  date: string
  readTime: string
  author: string
}

const Wrapper = styled.article`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    background-color: ${transparentize(0.9, theme.colors.black[100])};
    border-radius: 2px;
    padding: ${theme.spacings.large};
    row-gap: ${theme.spacings.xsmall};
    transition: background-color 250ms ease-in;
    :hover {
      background-color: ${transparentize(0.86, theme.colors.black[100])};
    }
  `}
`

const MainContent = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacings.small};
  `}
`

const Title = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xlarge};
    line-height: 29px;
    letter-spacing: -0.04em;
  `}
`

const Text = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.medium};
    line-height: 21px;
    letter-spacing: -0.01em;
    color: ${theme.colors.grey[200]};
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const ArticleCard = ({
  title,
  description,
  date,
  readTime,
  author,
}: ArticleCardProps) => {
  return (
    <Wrapper>
      <MainContent>
        <header>
          <Title>{title}</Title>
        </header>
        <section>
          <Text>{description}</Text>
        </section>
      </MainContent>
      <Footer>
        <ProfileName name={author} size={2} />
        <ArticleStats date={date} readTime={readTime} />
      </Footer>
    </Wrapper>
  )
}
