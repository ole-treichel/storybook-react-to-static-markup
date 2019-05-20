import React from 'react'
import addons from '@storybook/addons'
import { STORY_RENDERED } from '@storybook/core-events'

import Prism from 'prismjs'
const PrismTheme = `
/**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
 */

 code[class*="language-"],
 pre[class*="language-"] {
   color: black;
   background: none;
   text-shadow: 0 1px white;
   font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
   font-size: 1em;
   text-align: left;
   white-space: pre;
   word-spacing: normal;
   word-break: normal;
   word-wrap: normal;
   line-height: 1.5;

   -moz-tab-size: 4;
   -o-tab-size: 4;
   tab-size: 4;

   -webkit-hyphens: none;
   -moz-hyphens: none;
   -ms-hyphens: none;
   hyphens: none;
 }

 pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
 code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
   text-shadow: none;
   background: #b3d4fc;
 }

 pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
 code[class*="language-"]::selection, code[class*="language-"] ::selection {
   text-shadow: none;
   background: #b3d4fc;
 }

 @media print {
   code[class*="language-"],
   pre[class*="language-"] {
     text-shadow: none;
   }
 }

 /* Code blocks */
 pre[class*="language-"] {
   padding: 1em;
   margin: .5em 0;
   overflow: auto;
 }

 :not(pre) > code[class*="language-"],
 pre[class*="language-"] {
   background: #f5f2f0;
 }

 /* Inline code */
 :not(pre) > code[class*="language-"] {
   padding: .1em;
   border-radius: .3em;
   white-space: normal;
 }

 .token.comment,
 .token.prolog,
 .token.doctype,
 .token.cdata {
   color: slategray;
 }

 .token.punctuation {
   color: #999;
 }

 .namespace {
   opacity: .7;
 }

 .token.property,
 .token.tag,
 .token.boolean,
 .token.number,
 .token.constant,
 .token.symbol,
 .token.deleted {
   color: #905;
 }

 .token.selector,
 .token.attr-name,
 .token.string,
 .token.char,
 .token.builtin,
 .token.inserted {
   color: #690;
 }

 .token.operator,
 .token.entity,
 .token.url,
 .language-css .token.string,
 .style .token.string {
   color: #9a6e3a;
   background: hsla(0, 0%, 100%, .5);
 }

 .token.atrule,
 .token.attr-value,
 .token.keyword {
   color: #07a;
 }

 .token.function,
 .token.class-name {
   color: #DD4A68;
 }

 .token.regex,
 .token.important,
 .token.variable {
   color: #e90;
 }

 .token.important,
 .token.bold {
   font-weight: bold;
 }
 .token.italic {
   font-style: italic;
 }

 .token.entity {
   cursor: help;
 }
`

const PrismStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: PrismTheme }} />
)

class StaticMarkupPanel extends React.Component {
  state = {
    markup: null
  }
  onReceivedMarkup = markup => {
    const highlightedMarkup = Prism.highlight(markup, Prism.languages.markup, 'markup')
    this.setState({
      markup: highlightedMarkup
    })
  };

  componentDidMount() {
    const { api } = this.props
    api.on('staticmarkup/markup', this.onReceivedMarkup)
  }
  componentWillUnmount() {
    const { api } = this.props
    api.off('staticmarkup/markup', this.onReceivedMarkup)
  }

  render() {
    const { active } = this.props
    const { markup } = this.state

    return active ? <div>
      <PrismStyles />
      <pre>
        <code dangerouslySetInnerHTML={{ __html: markup }} />
      </pre>
    </div> : null
  }
}

// Register the addon with a unique name.
addons.register('storybook/STATICMARKUP', api => {
  // Also need to set a unique name to the panel.
  addons.addPanel('storybook/STATICMARKUP/panel', {
    title: 'Static Markup',
    render: ({ active, key }) => <StaticMarkupPanel key={key} api={api} active={active} />,
  })
})
