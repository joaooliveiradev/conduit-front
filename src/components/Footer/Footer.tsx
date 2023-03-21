import styled, { css } from 'styled-components'
import { transparentize } from 'polished'
import { TextButton } from '@/components'

const Wrapper = styled.footer`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    font-weight: 500;
    row-gap: ${theme.spacings.medium};
    padding-bottom: ${theme.spacings.xxhuge};
  `}
`

const Line = styled.div`
  ${({ theme }) => css`
    height: 1px;
    background-color: ${transparentize(0.8, theme.colors.grey[100])};
  `}
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`

const Text = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xmedium};
    line-height: 2.344rem;
    letter-spacing: -0.03em;
    color: ${transparentize(0.4, theme.colors.grey[100])};
  `}
`

export const Footer = () => {
  return (
    <Wrapper>
      <Line />
      <Content>
        <Text>
          Made with{' '}
          <TextButton href="https://www.typescriptlang.org/">
            Typescript
          </TextButton>{' '}
          and <TextButton href="https://nextjs.org/">Next.js</TextButton>.
        </Text>
        <Text>&copy; Copyright Conduit - All rights reserved</Text>
      </Content>
    </Wrapper>
  )
}
