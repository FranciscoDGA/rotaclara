/**
 * =====================================================================
 * RotaClara — Contato (/contato)
 * ---------------------------------------------------------------------
 * Formulário que abre o cliente de e-mail do usuário (mailto) — nenhuma
 * requisição é enviada a servidores e nenhum dado é coletado aqui.
 * =====================================================================
 */

import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Navigation";
import { ContactForm } from "@/components/institutional/ContactForm";
import { Card } from "@/components/ui/primitives";
import { buildMetadata } from "@/lib/seo/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contato",
  description:
    "Fale com a equipe da RotaClara: correções de conteúdo, sugestões de " +
    "destinos, parcerias e dúvidas sobre metodologia.",
  path: "/contato",
});

const TOPICS = [
  {
    title: "Correção de conteúdo",
    body: "Encontrou um dado desatualizado, uma informação incorreta ou uma fonte que não responde mais? Avise que revisamos o guia.",
  },
  {
    title: "Sugestão de destino",
    body: "Falta alguma cidade ou região na nossa base? Conte qual é e por que vale a pena cobrir — priorizamos pela demanda dos leitores.",
  },
  {
    title: "Metodologia e fontes",
    body: "Quer entender como uma estimativa foi calculada ou pedir a fonte de um número? Respondemos com detalhes.",
  },
  {
    title: "Parcerias",
    body: "Instituições de turismo, hotéis, operadores e veículos de mídia: use o assunto “Parceria” para falar com a gente.",
  },
];

export default function ContatoPage() {
  return (
    <div className="rc-container py-10 sm:py-14">
      <Breadcrumbs
        items={[{ label: "Início", href: "/" }, { label: "Contato" }]}
      />

      <header className="mt-5 max-w-3xl">
        <p className="rc-eyebrow">Institucional</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl">
          Contato
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#16304f]/80">
          Escreva para a gente. O formulário abaixo monta um e-mail no seu
          próprio aplicativo de e-mail — nada é enviado nem armazenado por
          este site.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <section aria-labelledby="form-contato">
          <h2
            id="form-contato"
            className="text-xl font-semibold tracking-tight text-[#0a1628]"
          >
            Envie uma mensagem
          </h2>
          <div className="mt-4">
            <ContactForm />
          </div>
        </section>

        <aside className="space-y-5">
          <Card>
            <h2 className="text-base font-semibold text-[#0a1628]">
              Assuntos que atendemos
            </h2>
            <ul className="mt-3.5 space-y-4">
              {TOPICS.map((t) => (
                <li key={t.title} className="border-b border-[#f4f1ea] pb-3.5 last:border-0 last:pb-0">
                  <p className="text-sm font-semibold text-[#0a1628]">
                    {t.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#8c8471]">
                    {t.body}
                  </p>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h2 className="text-base font-semibold text-[#0a1628]">
              Tempo de resposta
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#16304f]/85">
              Respondemos em até 5 dias úteis. Correções de conteúdo têm
              prioridade e costumam ser resolvidas mais rápido.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-[#8c8471]">
              Este site não possui suporte de reserva ou atendimento de
              provedores de hospedagem — para isso, fale diretamente com o
              provedor indicado na página do destino.
            </p>
          </Card>
        </aside>
      </div>
    </div>
  );
}
