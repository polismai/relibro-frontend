export function formatPrice(price: number) {
  const priceFormated = new Intl.NumberFormat(`es-UY`, {
    style: "currency",
    currency: "UYU",
  });

  return priceFormated.format(price);
}