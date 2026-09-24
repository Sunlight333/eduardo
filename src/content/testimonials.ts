export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company?: string;
};

// Vazio de propósito: o site antigo não tinha depoimentos e não devemos
// inventá-los. As seções de depoimentos só aparecem quando houver itens aqui.
// REVISAR: pedir 3 a 6 depoimentos reais (nome, cargo e empresa).
export const testimonials: Testimonial[] = [];
