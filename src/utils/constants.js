export const WHITELIST_DOMAINS = ['http://localhost:6100']

export const isVerifyCodeValid = (savedTimestamp, expirationTime) => {
  const currentTimestamp = Date.now()
  const timeDifference = currentTimestamp - savedTimestamp

  return timeDifference <= expirationTime
}

export const filterProducts = (products, filters) => {
  return products.filter((product) => {
    const nameCondition = !filters.name || product.name.toLowerCase().includes(filters.name.toLowerCase())
    const brandCondition = !filters.brand || product.brand.toLowerCase() === filters.brand.toLowerCase()
    const categoryCondition = !filters.category || product.category.toLowerCase() === filters.category.toLowerCase()
    const featuredCondition = !filters.featured || product.featured.toString().toLowerCase() === filters.featured.toLowerCase()

    return nameCondition && brandCondition && categoryCondition && featuredCondition
  })
}
