import { Meta, Story } from "@storybook/react";
import { ArticleCard, type ArticleCardProps } from "./ArticleCard"

const stories: Meta<ArticleCardProps> = {
  component: ArticleCard
}

const Template: Story<ArticleCardProps> = (args) => <ArticleCard {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Toward a Journalistic Ethic of Citation',
  author: 'Jeff Jarvis',
  date: 'May 26, 2022',
  readTime: '3min',
  description: 'After The New York Times published its extensive report on the history of Haiti’s impoverishment at the hands.'
}

export default stories
