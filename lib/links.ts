/**
 * Link único de entrada no grupo GRÁTIS. Aponta para o redirect do n8n
 * (/webhook/free-invite), que resolve o convite ATUAL do grupo no Evolution a
 * cada acesso — assim o link nunca quebra quando o convite do WhatsApp é
 * redefinido. Usado por todos os CTAs "Entrar no grupo grátis" (1 clique).
 */
export const FREE_GROUP_URL =
  process.env.NEXT_PUBLIC_FREE_GROUP_URL ||
  "https://n8n.vocaboost.com.br/webhook/free-invite";

/** Conversão do Google Ads disparada no clique de entrada no grupo grátis. */
export const FREE_GROUP_ADS_CONVERSION = "AW-18261023654/mANOCOLbmMkcEKa3xINE";
