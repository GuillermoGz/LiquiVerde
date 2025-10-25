import { SCORE_W_AMBIENTAL, SCORE_W_SOCIAL } from "../config.js";

export function optimizeCart(products, budget, type) {
    const base = products.map((product) => ({
        ...product,
        productAmbientalByPrice: Number(((product.sustainability.ambiental * 1000) / product.price).toFixed(4)),
        productSocialByPrice: Number(((product.sustainability.social * 1000) / product.price).toFixed(4)),
    }));
    const topSortAmbiental = [...base].sort((a, b) => b.productAmbientalByPrice - a.productAmbientalByPrice);
    const topSortSocial = [...base].sort((a, b) => b.productSocialByPrice - a.productSocialByPrice);

    const maxSocialByBudget = topSortSocial.reduce((acc, product) => {
        if (acc.remaining >= product.price) {
            acc.total += product.productSocialByPrice;
            acc.remaining -= product.price;
        }
        return acc;
    }, { total: 0, remaining: budget }).total;
    const maxAmbientalByBudget = topSortAmbiental.reduce((acc, product) => {
        if (acc.remaining >= product.price) {
            acc.total += product.productAmbientalByPrice;
            acc.remaining -= product.price;
        }
        return acc;
    }, { total: 0, remaining: budget }).total;

    const minAmbiental = 0.65 * maxAmbientalByBudget;
    const minSocial = 0.65 * maxSocialByBudget;
    let productAmbiental = [];
    let productSocial = [];
    let auxAmbientalScoreA = 0;
    let auxAmbientalScoreS = 0;
    let auxSocialScoreA = 0;
    let auxSocialScoreS = 0;
    let restanteAmbiental = budget;
    let restanteSocial = budget;
    for (let i = 0; i < base.length; i++) {
        if (restanteAmbiental - topSortAmbiental[i].price >= 0 || auxAmbientalScoreA < minAmbiental) {
            productAmbiental.push(topSortAmbiental[i])
            restanteAmbiental -= topSortAmbiental[i].price
            auxAmbientalScoreA += topSortAmbiental[i].productAmbientalByPrice
            auxAmbientalScoreS += topSortSocial[i].productSocialByPrice
        }
        if (restanteSocial - topSortSocial[i].price >= 0 || auxSocialScoreS < minSocial) {
            productSocial.push(topSortSocial[i])
            restanteSocial -= topSortSocial[i].price
            auxSocialScoreA += topSortSocial[i].productAmbientalByPrice
            auxSocialScoreS += topSortSocial[i].productSocialByPrice

        }
    }

    let res1 = greedyFillThenRefill(
        restanteAmbiental, topSortAmbiental, productAmbiental, auxAmbientalScoreA, auxAmbientalScoreS,
        restanteSocial, topSortSocial, productSocial, auxSocialScoreS, auxSocialScoreA
    );

    restanteAmbiental = res1.restanteAmbiental;
    auxAmbientalScoreA = res1.auxAmbientalScoreA;
    auxAmbientalScoreS = res1.auxAmbientalScoreS;
    restanteSocial = res1.restanteSocial;
    auxSocialScoreS = res1.auxSocialScoreS;
    auxSocialScoreA = res1.auxSocialScoreA;
    productAmbiental = res1.productAmbiental;
    productSocial = res1.productSocial;
    let typeBoolean = type == 2 ? true : false;
    let res2 = greedyFillThenRefill(
        restanteAmbiental, topSortAmbiental, productAmbiental, auxAmbientalScoreA, auxAmbientalScoreS,
        restanteSocial, topSortSocial, productSocial, auxSocialScoreS, auxSocialScoreA, typeBoolean
    );

    restanteAmbiental = res2.restanteAmbiental;
    auxAmbientalScoreA = res2.auxAmbientalScoreA;
    auxAmbientalScoreS = res2.auxAmbientalScoreS;
    restanteSocial = res2.restanteSocial;
    auxSocialScoreS = res2.auxSocialScoreS;
    auxSocialScoreA = res2.auxSocialScoreA;
    productAmbiental = groupById(res2.productAmbiental);
    productSocial = groupById(res2.productSocial);
    if (auxAmbientalScoreA >= auxSocialScoreA && SCORE_W_AMBIENTAL >= SCORE_W_SOCIAL) {
        return {
            scoreAmbiental: auxAmbientalScoreA,
            scoreSocial: auxAmbientalScoreS,
            remaining: restanteAmbiental,
            products: productAmbiental
        }
    } else {
        return {
            scoreAmbiental: auxSocialScoreA,
            scoreSocial: auxSocialScoreS,
            remaining: restanteSocial,
            products: productSocial
        }
    }
}

function greedyFillThenRefill(restanteAmbiental, topSortAmbiental, productAmbiental, auxAmbientalScoreA, auxAmbientalScoreS,
    restanteSocial, topSortSocial, productSocial, auxSocialScoreS, auxSocialScoreA, filter = false, maxPasses = 1000) {
    const len = topSortAmbiental.length;
    let passes = 0;
    const minA = len ? Math.min(...topSortAmbiental.map(product => product.price)) : Infinity;
    const minS = len ? Math.min(...topSortSocial.map(product => product.price)) : Infinity;
    while (passes++ < maxPasses) {
        if (filter) {
            if (productAmbiental.length > 0) {
                const maxPriceProductAmbiental = productAmbiental.reduce((max, product) =>
                    product.price > max.price ? product : max
                );
                restanteAmbiental += maxPriceProductAmbiental.price;
                auxAmbientalScoreA -= maxPriceProductAmbiental.productAmbientalByPrice;
                auxAmbientalScoreS -= maxPriceProductAmbiental.productSocialByPrice;
                productAmbiental = productAmbiental.filter(product => product !== maxPriceProductAmbiental);
            }

            if (productSocial.length > 0) {
                const maxPriceProductSocial = productSocial.reduce((max, product) =>
                    product.price > max.price ? product : max
                );
                restanteSocial += maxPriceProductSocial.price;
                auxSocialScoreS -= maxPriceProductSocial.productSocialByPrice;
                auxSocialScoreA -= maxPriceProductSocial.productAmbientalByPrice;
                productSocial = productSocial.filter(product => product !== maxPriceProductSocial);
            }
        }

        for (let j = 0; j < len; j++) {
            if (restanteAmbiental - topSortAmbiental[j].price >= 0) {
                productAmbiental.push(topSortAmbiental[j])
                restanteAmbiental -= topSortAmbiental[j].price
                auxAmbientalScoreA += topSortAmbiental[j].productAmbientalByPrice
                auxAmbientalScoreS += topSortAmbiental[j].productSocialByPrice
            }
            if (restanteSocial - topSortSocial[j].price >= 0) {
                productSocial.push(topSortSocial[j])
                restanteSocial -= topSortSocial[j].price
                auxSocialScoreS += topSortSocial[j].productSocialByPrice
                auxSocialScoreA += topSortSocial[j].productAmbientalByPrice
            }
        }
        if (restanteAmbiental < minA && restanteSocial < minS) break;
    }

    return {
        restanteAmbiental,
        productAmbiental,
        auxAmbientalScoreA,
        auxAmbientalScoreS,
        restanteSocial,
        productSocial,
        auxSocialScoreS,
        auxSocialScoreA
    };
}

function groupById(products) {
    const result = {};

    products.forEach(product => {
        if (!result[product._id]) {
            result[product._id] = { ...product, qty: 1 };
        } else {
            result[product._id].qty++;
        }
    });

    return Object.values(result);
}
