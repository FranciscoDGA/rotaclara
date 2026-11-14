/**
 * =====================================================================
 * RotaClara — Termos de uso (/termos)
 * =====================================================================
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Navigation";
import { Card } from "@/components/ui/primitives";
import { buildMetadata } from "@/lib/seo/seo";

export const metadata: Metadata = buildMetadata({
  title: "Termos de uso",
  description:
    "Condições de uso da RotaClara: natureza informativa do conteúdo, " +
    "limites das estimativas, responsabilidades e propriedade intelectual.",
  path: "/termos",
});

const SECTIONS = [
  {
    id: "natureza",
    title: "1. Natureza do serviço",
    body: [
      "A RotaClara é uma plataforma informativa e de planejamento de viagens. O conteúdo tem caráter editorial e educativo, destinado a ajudar na tomada de decisão antes de uma viagem.",
      "Não somos agência de viagem, operadora turística, corretora nem prestador de serviços de hospedagem. Não intermediamos reservas, compras, pagamentos ou contratos com terceiros.",
    ],
  },
  {
    id: "estimativas",
    title: "2. Estimativas não são preços",
    body: [
      "Todos os valores monetários exibidos são estimativas de planejamento, construídas com a metodologia descrita em cada página e na nossa página de metodologia. Eles não representam cotação, oferta, preço garantido nem disponibilidade.",
      "Preços e disponibilidade reais são definidos exclusivamente pelos provedores (companhias aéreas, hotéis, operadores) e podem mudar a qualquer momento. Confirme sempre com o provedor antes de qualquer compromisso.",
    ],
  },
  {
    id: "conteudo",
    title: "3. Conteúdo editorial e imprecisões",
    body: [
      "Trabalhamos para manter o conteúdo preciso e atualizado, com fontes e datas de consulta registradas. Ainda assim, informação de viagem muda — horários, regras, condições de acesso e preços têm validade própria.",
      "Se encontrar algo incorreto, nos avise pelo formulário de contato. Correções são tratadas com prioridade.",
    ],
  },
  {
    id: "responsabilidade",
    title: "4. Responsabilidade",
    body: [
      "A decisão de viajar, reservar, contratar ou se deslocar é sua. A RotaClara não se responsabiliza por decisões tomadas com base exclusiva nas estimativas aqui exibidas, nem por prejuízos decorrentes de informações de terceiros.",
      "Você é responsável por verificar documentos, vacinas, restrições de entrada, condições climáticas e demais exigências aplicáveis à sua viagem.",
    ],
  },
  {
    id: "links",
    title: "5. Links e afiliados",
    body: [
      "O site pode conter links para sites de terceiros, incluindo parceiros afiliados. Esses sites têm suas próprias políticas e termos, sobre os quais não temos controle.",
      "A eventual comissão de afiliado não altera o preço para você nem influencia o conteúdo editorial. Detalhes na nossa política de afiliados.",
    ],
  },
  {
    id: "propriedade",
    title: "6. Propriedade intelectual",
    body: [
      "Textos, marca, identidade visual, arte gerada e organização do conteúdo são propriedade da RotaClara, salvo indicação em contrário e salvo o que a legislação de direitos autorais brasileira reserva ao usuário.",
      "É permitido citar trechos com atribuição e link para a página original. Reprodução integral do conteúdo sem autorização não é permitida.",
    ],
  },
  {
    id: "dados",
    title: "7. Dados do usuário",
    body: [
      "Não exigimos cadastro. O roteiro montado na ferramenta fica gravado apenas no armazenamento local do seu navegador. Detalhes na política de privacidade e na política de cookies.",
    ],
  },
  {
    id: "alteracoes",
    title: "8. Alterações nos termos",
    body: [
      "Podemos atualizar estes termos para refletir mudanças no serviço ou na legislação. A data da revisão aparece no topo da página; mudanças relevantes serão comunicadas em destaque na homepage.",
    ],
  },
];

export default function TermosPage() {
  return (
    <div className="rc-container py-10 sm:py-14">
      <Breadcrumbs
        items={[{ label: "Início", href: "/" }, { label: "Termos" }]}
      />

      <header className="mt-5 max-w-3xl">
        <p className="rc-eyebrow">Institucional</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl">
          Termos de uso
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#16304f]/80">
          Estes termos regulam o uso da plataforma RotaClara. Ao navegar
          aqui, você aceita as condições abaixo — em especial o fato de que
          trabalhamos com estimativas de planejamento, não com reservas.
        </p>
        <p className="mt-3 text-sm text-[#8c8471]">
          Última atualização: <time dateTime="2026-11-13">13/11/2026</time>.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          {SECTIONS.map((s) => (
            <section key={s.id} aria-labelledby={s.id}>
              <h2
                id={s.id}
                className="text-xl font-semibold tracking-tight text-[#0a1628]"
              >
                {s.title}
              </h2>
              <div className="mt-3 space-y-3">
                {s.body.map((p, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-[#16304f]/85"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="space-y-5 lg:sticky lg:top-[calc(var(--rc-header-h)+1.5rem)] lg:self-start">
          <Card>
            <h2 className="text-base font-semibold text-[#0a1628]">
              Em poucas linhas
            </h2>
            <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#16304f]/85">
              <li>• Você planeja; a gente informa.</li>
              <li>• Estimativa não é preço.</li>
              <li>• Reserva é sempre com o provedor.</li>
              <li>• Correções são bem-vindas.</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-base font-semibold text-[#0a1628]">
              Documentos relacionados
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/privacidade"
                  className="font-medium text-[#17827c] underline underline-offset-2"
                >
                  Política de privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="font-medium text-[#17827c] underline underline-offset-2"
                >
                  Política de cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/afiliados"
                  className="font-medium text-[#17827c] underline underline-offset-2"
                >
                  Política de afiliados
                </Link>
              </li>
              <li>
                <Link
                  href="/metodologia"
                  className="font-medium text-[#17827c] underline underline-offset-2"
                >
                  Metodologia
                </Link>
              </li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-base font-semibold text-[#0a1628]">
              Dúvidas sobre os termos
            </h2>
            <Link
              href="/contato"
              className="mt-3 inline-block text-sm font-medium text-[#17827c] underline underline-offset-2"
            >
              Falar com a equipe →
            </Link>
          </Card>
        </aside>
      </div>
    </div>
  );
}
