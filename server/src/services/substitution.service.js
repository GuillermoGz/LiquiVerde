import { SCORE_W_AMBIENTAL, SCORE_W_SOCIAL } from "../config.js";

export function recommendProduct(price, sustainability, weightGrams, productsByCategory) {
    const maxPrice = price * 1.2;
    const candidatesAmbiental = productsByCategory.filter(product =>
        product.price <= maxPrice &&
        (product.sustainability.ambiental * product.weightGrams) / product.price > (sustainability.ambiental * weightGrams) / price
    ).sort((a, b) => b.sustainability.ambiental - a.sustainability.ambiental);
    const candidatesSocial = productsByCategory.filter(product =>
        product.price <= maxPrice &&
        (product.sustainability.social * product.weightGrams) / product.price > (sustainability.social * weightGrams) / price
    ).sort((a, b) => b.sustainability.social - a.sustainability.social);
    if (SCORE_W_AMBIENTAL >= SCORE_W_SOCIAL) {
        return candidatesAmbiental
    } else {
        return candidatesSocial
    }
}