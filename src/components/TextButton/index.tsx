import styled, { css } from 'styled-components'

export type TextButtonProps = {
  href: string
  children: React.ReactNode
}

const Link = styled.a`
  ${({ theme }) => css`
    color: ${theme.colors.black[400]};
    font-size: ${theme.fonts.sizes.medium};
    font-weight: 700;
    border-bottom: 2px solid ${theme.colors.black[100]};
    line-height: 21px;
    letter-spacing: -0.02em;
    padding: 0 2px;
    &:focus-visible {
      border: none;
    }
  `}
`

export const TextButton = ({ href, children }: TextButtonProps) => (
  <Link href={href}>{children}</Link>
)