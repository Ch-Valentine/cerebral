import React from 'react'

function Navigation(props) {
  // To understand how navigation is composed, start from the bottom

  function Headings({ toc, path }) {
    if (!toc.length) {
      return null
    }
    return (
      <ul>
        {toc.map(function(item, index) {
          const href = `${path}#${item.id}`

          return (
            <li key={index}>
              {item.children.length > 0 &&
                <input
                  id={href}
                  className="nav_toggle"
                  type="checkbox"
                  defaultChecked={false}
                />}
              <label
                htmlFor={href}
                className={`${item.children.length
                  ? 'nav_toggle-label'
                  : 'nav_toggle-label-empty'} nav_sublink`}
              >
                <a href={href}>{item.title}</a>
              </label>
              <Headings toc={item.children} path={path} />
            </li>
          )
        })}
      </ul>
    )
  }

  function Pages(props) {
    return (
      <ul>
        {Object.keys(props.pages).map((pageKey, index) => {
          const page = props.pages[pageKey].toc[0]
          const path = index === 0
            ? `/docs/${props.sectionKey}/index.html`
            : `/docs/${props.sectionKey}/${pageKey}.html`
          const open = pageKey === props.docName && props.sectionOpen
          return (
            <li key={index} className={`page_item ${open ? 'nav_open' : ''}`}>
              {page.children.length > 0 &&
                <input
                  id={path}
                  className="nav_toggle"
                  type="checkbox"
                  defaultChecked={open}
                />}
              <label
                htmlFor={path}
                className={`${page.children.length
                  ? 'nav_toggle-label'
                  : 'nav_toggle-label-empty'} nav_link nav_page`}
              >
                <a href={path}>{page.title}</a>
              </label>
              <Headings toc={page.children} path={path} />
            </li>
          )
        })}
      </ul>
    )
  }

  function Sections(props) {
    return (
      <ul>
        {[
          <li key={'home'} className="nav_item">
            <label className="nav_toggle-label nav_section nav_home">
              <a href="/">HOME</a>
            </label>
          </li>,
        ].concat(
          Object.keys(props.docs).map(function(sectionKey, index) {
            const open = props.sectionName === sectionKey
            return (
              <li key={index} className={`nav_item ${open ? 'nav_open' : ''}`}>
                <input
                  id={sectionKey}
                  className="nav_toggle"
                  type="checkbox"
                  defaultChecked={open}
                />
                <label
                  htmlFor={sectionKey}
                  className="nav_toggle-label nav_section"
                >
                  <a>{sectionKey.replace('_', ' ').toUpperCase()}</a>
                </label>
                <Pages
                  docName={props.docName}
                  sectionKey={sectionKey}
                  sectionOpen={open}
                  pages={props.docs[sectionKey]}
                />
              </li>
            )
          })
        )}
      </ul>
    )
  }

  function Search() {
    return (
      <div id="nav_search">
        <input id="search-docs" autoFocus type="text" placeholder="search..." />
        <div id="search-result" />
      </div>
    )
  }

  function Header() {
    return (
      <div id="nav_header">
        <Search />
        <a
          href="https://github.com/cerebral/cerebral"
          className="nav_button"
          target="_new"
          title="GitHub"
        >
          <div className="nav_button-github" />
        </a>
        <a
          href="https://discord.gg/0kIweV4bd2bwwsvH"
          className="nav_button"
          target="_new"
          title="Chat"
        >
          <div className="nav_button-discord" />
        </a>
        <a
          href="https://twitter.com/cerebraljs"
          className="nav_button"
          target="_new"
          title="Chat"
        >
          <div className="nav_button-twitter" />
        </a>
      </div>
    )
  }

  return (
    <div id="nav">
      <Header />
      <Sections
        docs={props.docs}
        docName={props.docName}
        sectionName={props.sectionName}
      />
    </div>
  )
}

export default Navigation
