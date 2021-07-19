import tw from "tailwind-styled-components"

interface TitleProps {
  large?: boolean;
}

const Title = tw.h1<TitleProps>`
  ${(p) => (p.large ? "text-lg" : "text-base")}
  text-red-500
  text-xxxl
`

export { Title };