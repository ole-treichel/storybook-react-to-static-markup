import React from 'react'
import addons, { makeDecorator } from '@storybook/addons'

import ReactDOMServer from 'react-dom/server'
import pretty from 'pretty'

class ShowStaticMarkup extends React.Component {
  render () {
    const { children } = this.props

    const markup = pretty(ReactDOMServer.renderToStaticMarkup(children), {ocd: true})
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
