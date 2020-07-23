import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

class IndexCategory extends React.Component {
  render() {
    const { data } = this.props

    return (
      <React.Fragment>
        <div className="row product-main">
          {data.data.allProduct.nodes.map(item => (
            <div
              className="Catalogue__item col-sm-12 col-md-6 col-lg-4"
              key={item.id}
            >
              <Link to={`/${data.data.category.slug}/${item.slug}`}>
                <div className="details_List">
                  {item.productImage && item.productImage[0] ? (
                    <Img
                      sizes={{
                        src: `${process.env.GATSBY_FLOTIQ_BASE_URL}/image/1920x0/${item.productImage[0].id}.${item.productImage[0].extension}`,
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
                    <div className="row">
                      <div className="col-sm-4 align-self-center">
                        <span className="price">${item.price}</span>
                      </div>
                      <div className="col-sm-8 text-right align-self-center">
                        <a
                          href={`/${data.data.category.slug}`}
                          className="Product snipcart-add-item"
                          data-item-id={item.slug}
                          data-item-price={item.price}
                          data-item-image={
                            item.productImage && item.productImage[0]
                              ? `${process.env.GATSBY_FLOTIQ_BASE_URL}/image/1920x0/${item.productImage[0].id}.${item.productImage[0].extension}`
                              : ""
                          }
                          data-item-name={item.name}
                          data-item-url={`/${data.data.category.slug}`}
                        >
                          <i className="fas fa-shopping-bag" />
                          Add to Cart
                        </a>
                      </div>
                    </div>
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

const CategoryPage = data => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div className="container">
      <div className="text-center mt-5">
        <h2 className="with-underline">{data.data.category.name}</h2>
      </div>
      <IndexCategory data={data} />
    </div>
  </Layout>
)

export default CategoryPage

export const query = graphql`
  query CategoryQuery($slug: String!) {
    allProduct(
      sort: { fields: flotiqInternal___createdAt, order: DESC }
      filter: { category: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      nodes {
        id
        slug
        name
        price
        description
        productImage {
          id
          extension
        }
        productGallery {
          id
          extension
        }
      }
    }
    category(slug: { eq: $slug }) {
      name
      slug
    }
  }
`
