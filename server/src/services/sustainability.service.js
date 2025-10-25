import { SCORE_W_AMBIENTAL, SCORE_W_SOCIAL, SCORE_W_ECONOMICO } from "../config.js";

export function computeSustainabilityScore(product) {
    const wA = SCORE_W_AMBIENTAL ?? 0.5;
    const wS = SCORE_W_SOCIAL ?? 0.3;
    const wE = SCORE_W_ECONOMICO ?? 0.2;

    const { ambiental = 0, social = 0, economico = 0 } = product.sustainability || {};

    let score = wA * ambiental + wS * social + wE * economico;
    if (score > 1) {
        score = 1;
    }
    return Number(score.toFixed(4));
}