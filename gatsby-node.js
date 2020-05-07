var path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const StoreTemplate = path.resolve("src/templates/details.js")
    const CategoryTemplate = path.resolve("src/templates/category.js")
    resolve(
      graphql(`{
          allProduct(sort: {fields: flotiqInternal___createdAt, order: DESC}) {
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
                category {
                  slug
                }
              }
          }
          allCategory(sort: {fields: flotiqInternal___createdAt, order: DESC}) {
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
      `).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        const products = result.data.allProduct.nodes;

        products.forEach((node) => {

          createPage({
            path: node.category[0].slug + '/' + node.slug,
            component: StoreTemplate,
            context: {
              slug: node.slug,
            },
          })
        });

          const categories = result.data.allCategory.nodes;

          categories.forEach((node) => {


              createPage({
                  path: node.slug,
                  component: CategoryTemplate,
                  context: {
                      slug: node.slug,
                  },
              })
          });
        return
      })
    )
  })
}
