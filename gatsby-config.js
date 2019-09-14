module.exports = {
  siteMetadata: {
    title: `Bart Widlarz's Blog`,
    author: `Bart Widlarz`,
    description: `As a software developer, team leader and business owner I write about technology from various perspectives. I specialize in React and React Native applications.`,
    siteUrl: `https://bwidlarz.com/`,
    social: {
      twitter: `BWidlarz`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-autolink-headers`,
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '÷',
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow"
            }
          },
          {
            resolve: 'gatsby-plugin-mailchimp',
            options: {
              endpoint: 'https://gmail.us3.list-manage.com/subscribe/post?u=86012a40b6e392982f77c3065&amp;id=249a849ae8',
            },
          },
          {
            resolve: `gatsby-plugin-emotion`,
            options: {
              // Accepts all options defined by `babel-plugin-emotion` plugin.
            },
          },
          `gatsby-remark-embedder`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-138237728-1`,
        anonymize: true,
        cookieExpires: 0,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Bart Widlarz`,
        short_name: `bwidlarz`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-twitter`,
  ],
}
