import React from "react"
import { StaticQuery, graphql } from "gatsby"
import profilePic from "../../content/assets/profile-pic.jpg"

import { rhythm } from "../utils/typography"

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div
            style={{
              display: `flex`,
              marginBottom: rhythm(2.5),
            }}
          >
            <img
              src={profilePic}
              alt={`Bart Widlarz`}
              style={{
                marginRight: rhythm(1 / 2),
                width: rhythm(2),
                height: rhythm(2),
                borderRadius: "50%",
              }}
            />
            <p>
              Written by <strong>{author}</strong> who works remotely in
              software development as a developer and leader.
              {` `}
              <a href={`https://twitter.com/${social.twitter}`}>Twitter</a>
              {` `}
              <a href={`https://linkedin.com/in/widlarz`}>Linkedin</a>
            </p>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
