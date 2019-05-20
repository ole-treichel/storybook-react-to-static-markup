import React from 'react'
import addons, { makeDecorator } from '@storybook/addons'

import ReactDOMServer from 'react-dom/server'

class ShowStaticMarkup extends React.Component {
  render () {
    const { children } = this.props

    const markup = ReactDOMServer.renderToStaticMarkup(children)
    const channel = addons.getChannel()

    channel.emit('staticmarkup/markup', markup)

    return children
  }
}

const withStaticMarkup = makeDecorator({
  name: 'withStaticMarkup',
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { parameters }) => {
    const channel = addons.getChannel()
    channel.emit('staticmarkup/markup', getStory)
    return <ShowStaticMarkup>{getStory(context)}</ShowStaticMarkup>
  }
})

export default withStaticMarkup
