import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

class IndexPost extends React.Component {
  render() {
    const { data } = this.props
    console.log(data)

    return (
      <React.Fragment>
        <div className="row product-main">
          {data.data.allCategory.nodes.map(item => (
            <div
              className="Catalogue__item col-sm-12 col-md-6 col-lg-4"
              key={item.id}
            >
              <Link to={`/${item.slug}`}>
                <div className="details_List">
                  {item.image && item.image[0] ? (
                    <Img
                      sizes={{
                        src: `${process.env.GATSBY_FLOTIQ_BASE_URL}/image/1920x0/${item.image[0].id}.${item.image[0].extension}`,
                        aspectRatio: 1.77,
                        sizes: "",
                        srcSet: "",
                      }}
                    />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}

                  <div className="details_inner">
                    <h2>{item.name}</h2>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </React.Fragment>
    )
  }
}

const IndexPage = data => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div className="container">
      <div className="text-center mt-5">
        <h2 className="with-underline">Categories</h2>
      </div>
      <IndexPost data={data} />
    </div>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query AboutQuery {
    allCategory(sort: { fields: flotiqInternal___createdAt, order: DESC }) {
      nodes {
        id
        image {
          extension
          id
        }
        name
        slug
      }
    }
  }
`
